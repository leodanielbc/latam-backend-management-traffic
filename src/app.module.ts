import { Module } from '@nestjs/common';
import { CarsModule } from './components/cars/cars.module';
import { UsersModule } from './components/users/users.module';
import { TrafficModule } from './components/traffic/traffic.module';
import { DatabaseModule } from './drivers/database/database.module';
import { enviroments } from './shared/enviroments';
import config from './config/config';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] ? '.env' : enviroments[process.env.NODE_ENV],
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    CarsModule,
    UsersModule,
    TrafficModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
