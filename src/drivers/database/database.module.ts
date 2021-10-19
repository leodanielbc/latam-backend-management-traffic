import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';
import config from '../../config/config';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigType<typeof config>) => ({
                uri: configService.mongo.uri.toString()
            }),
            inject: [config.KEY],
        })
    ],
    exports: [MongooseModule]
})
export class DatabaseModule { }
