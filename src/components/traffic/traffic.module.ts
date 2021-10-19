import { Module } from '@nestjs/common';
import { TrafficService } from './services/traffic.service';
import { TrafficController } from './controllers/traffic.controller';

@Module({
  providers: [TrafficService],
  controllers: [TrafficController]
})
export class TrafficModule {}
