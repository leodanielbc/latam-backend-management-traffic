import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrafficDto } from '../dtos/traffic.dto';
import { Configuration } from '../entities/configuration.entity';
import { Traffic } from '../entities/traffic.entity';

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

            dataTraffic.configuration = configuracionesId;

            const traffic = await new this.trafficModel(dataTraffic).save();

            return traffic;

        } catch (error) {
            throw error;
        }
    }
}
