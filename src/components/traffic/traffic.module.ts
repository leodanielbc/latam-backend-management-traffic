import { Module } from '@nestjs/common';
import { TrafficService } from './services/traffic.service';
import { TrafficController } from './controllers/traffic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Traffic, TrafficSchema } from './entities/traffic.entity';
import { Configuration, ConfigurationSchema } from './entities/configuration.entity';
import { ResponseServer } from '../../shared/response-server';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Traffic.name,
        schema: TrafficSchema,
        collection: 'traffic',
      },
      {
        name: Configuration.name,
        schema: ConfigurationSchema,
        collection: 'configuration',
      },
    ]),
  ],
  providers: [
    ResponseServer,
    TrafficService
  ],
  controllers: [TrafficController],
  exports: [
    TrafficService
  ]
})
export class TrafficModule { }
