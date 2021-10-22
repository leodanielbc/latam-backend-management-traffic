import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrafficConsultDto, TrafficDto } from '../dtos/traffic.dto';
import { Configuration } from '../entities/configuration.entity';
import { Traffic } from '../entities/traffic.entity';
import { format, compareAsc, addDays } from 'date-fns';

@Injectable()
export class TrafficService {
    constructor(
        @InjectModel(Traffic.name) private trafficModel: Model<Traffic>,
        @InjectModel(Configuration.name) private configurationModel: Model<Configuration>,
    ) { }

    async createConfigurationTraffic(dataTraffic: TrafficDto) {
        try {

            let configuracionesId = [];
            for (const configuration of dataTraffic.configuration) {

                const configurationSave = await new this.configurationModel(configuration).save();
                configuracionesId = [...configuracionesId, configurationSave._id]
            }


            // set Date
            const fechaInicio = new Date(dataTraffic.fechaInicio + 'T00:00:00.000Z');

            const fechaFin = new Date(dataTraffic.fechaFin + 'T23:59:59.999Z');

            if (fechaFin.getTime() < fechaInicio.getTime()) throw { codigoEstado: HttpStatus.EXPECTATION_FAILED, message: "La fecha esta incorrecta" };

            dataTraffic.configuration = configuracionesId;
            dataTraffic.fechaInicio = fechaInicio;
            dataTraffic.fechaFin = fechaFin;

            const traffic = await new this.trafficModel(dataTraffic).save();

            return traffic;

        } catch (error) {
            throw error;
        }
    }

    async checkTraffic(dataTrafficConsult: TrafficConsultDto) {
        try {

            const todayFormat = format(new Date(), 'yyyy-MM-dd');
            const today = new Date(todayFormat + 'T00:00:00.000Z');



            const fechaParam = new Date(dataTrafficConsult.fecha + 'T00:00:00.000Z');

            const fechaParamFormat = format(addDays(fechaParam, 1), 'dd MMMM yyyy');
            const dayParamFormat = Number(format(addDays(fechaParam, 1), 'dd'));



            // validar fecha sea mayor al dia actual
            const validarFecha = compareAsc(fechaParam, today);

            if (validarFecha < 0) throw { codigoEstado: HttpStatus.EXPECTATION_FAILED, message: "La fecha esta incorrecta" };


            const getTraffic = await this.trafficModel.find({ estado: 'activo' })
                .populate('configuration');

            // validar si hay una configuracion activa de circulacion
            if (getTraffic.length === 0) throw { codigoEstado: HttpStatus.FOUND, message: "El sistema esta deshabilitado" };

            const positionDigit = dataTrafficConsult.placa.length - 1;
            const ultimoDigito = dataTrafficConsult.placa[positionDigit];

            const digitoConvert = Number(ultimoDigito);

            // _________________________configuracion por defecto_______________
            if (getTraffic.length === 1) {
                const trafficDefault = getTraffic.find((element) => element.default === true);

                const checkDia = dayParamFormat % 2 === 0 ? "par" : "impar";

                for (const configuration of trafficDefault.configuration) {
                    if (configuration.tipo === checkDia) {
                        const check = configuration.placas.find((numero) => numero === digitoConvert);
                        if (check) {
                            return { circular: true, message: `El vehiculo puede circular el ${fechaParamFormat}` };
                        }
                    }
                }

                return { circular: false, message: `El vehiculo NO puede circular el ${fechaParamFormat}` };
            }

            // ________________________configuracion de exepcion________________________________
            const trafficException = getTraffic.filter((element) => element.default != true);
            return trafficException;

        } catch (error) {
            throw error;
        }
    }
}
