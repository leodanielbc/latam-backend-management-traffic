import { Module } from '@nestjs/common';
import { CarService } from './services/car.service';
import { CarController } from './controllers/car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './entities/car.entity';
import { ResponseServer } from '../../shared/response-server';
import { User, UserSchema } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Car.name,
        schema: CarSchema,
        collection: 'car',
      },
    ]),
    UsersModule,
  ],
  providers: [
    ResponseServer,
    CarService,
  ],
  controllers: [
    CarController
  ],
  exports: [
    CarService,
  ]
})
export class CarsModule { }
