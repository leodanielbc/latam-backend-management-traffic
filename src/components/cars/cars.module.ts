import { Module } from '@nestjs/common';
import { CarService } from './services/car.service';
import { CarController } from './controllers/car.controller';

@Module({
  providers: [CarService],
  controllers: [CarController]
})
export class CarsModule {}
