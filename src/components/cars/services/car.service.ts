import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../../users/services/user.service';
import { RegisterCarDto } from '../dtos/car.dto';
import { Car } from '../entities/car.entity';

@Injectable()
export class CarService {
    constructor(
        @InjectModel(Car.name) private CarModel: Model<Car>,
        private userService: UserService
    ) { }

    async createCar(dataCar: RegisterCarDto) {

        try {
            let dataUser;

            if (dataCar?.user) {
                dataUser = await this.userService.createUser(dataCar.user);
                dataCar.user = dataUser._id;
            }


            const car = await new this.CarModel(dataCar).save();

            return car;
        } catch (error) {
            throw error;
        }
    }
}
