import { Controller, Post, Headers, Body, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ResponseServer } from 'src/shared/response-server';
import { CarConsultDto, RegisterCarDto } from '../dtos/car.dto';
import { CarService } from '../services/car.service';

@ApiTags('Cars')
@Controller('api/cars')
export class CarController {

    constructor(
        private readonly carService: CarService,
        private readonly responseServer: ResponseServer,
    ) {
    }

    @Post('/')
    @ApiSecurity('Authorization')
    @ApiBody({ type: RegisterCarDto })
    @ApiHeader({ name: 'apiKey', description: 'key para usar las rutas', required: true })
    @ApiOperation({ summary: 'Registra autos' })
    @ApiResponse({ status: 201, description: 'Creación correcta' })
    @ApiResponse({ status: 404, description: 'Error al crear' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 406, description: 'Parámetros no validos' })

    async registerCar(
        @Headers() headers,
        @Body() dataCar: RegisterCarDto
    ) {

        try {
            const carSave = await this.carService.createCar(dataCar);
            if (carSave) {
                return this.responseServer.enviarRespuestaOptimizada({ codigoEstado: HttpStatus.OK, datos: carSave, mensaje: 'El vehiculo se ha registrado correctamente' })
            } else {
                return this.responseServer.enviarRespuestaOptimizada({ codigoEstado: HttpStatus.EXPECTATION_FAILED, mensaje: 'Error al Registrar' })
            }
        } catch (error) {
            return this.responseServer.enviarRespuestaOptimizada({
                codigoEstado: HttpStatus.INTERNAL_SERVER_ERROR,
                mensaje: error.message
            });
        }

    }

    @Get('/')
    @ApiSecurity('Authorization')
    @ApiHeader({ name: 'apiKey', description: 'key para usar las rutas', required: true })
    @ApiOperation({ summary: 'consultar registro del vehiculo' })
    @ApiResponse({ status: 200, description: 'Vehiculo ya esta registrado' })
    @ApiResponse({ status: 404, description: 'Error al consultar' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 406, description: 'Parámetros no validos' })

    async checkRegister(
        @Headers() headers,
        @Query() dataTraffic: CarConsultDto
    ) {

        try {
            const traffic: any = await this.carService.checkRegister(dataTraffic);
            if (traffic) {
                return this.responseServer.enviarRespuestaOptimizada({ codigoEstado: HttpStatus.OK, mensaje: traffic.message, datos: traffic });
            } else {
                return this.responseServer.enviarRespuestaOptimizada({ codigoEstado: HttpStatus.OK, mensaje: traffic.message });
            }
        } catch (error) {
            if (error.codigoEstado) {
                return this.responseServer.enviarRespuestaOptimizada({
                    codigoEstado: error.codigoEstado,
                    mensaje: error.message
                });
            } else {
                return this.responseServer.enviarRespuestaOptimizada({
                    codigoEstado: HttpStatus.INTERNAL_SERVER_ERROR,
                    mensaje: error.message
                });
            }
        }

    }

}
