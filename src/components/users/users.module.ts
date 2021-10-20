import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Car, CarSchema } from '../cars/entities/car.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: 'user',
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [
    UserService,
  ]
})
export class UsersModule {}
