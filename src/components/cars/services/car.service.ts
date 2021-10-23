import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../../users/services/user.service';
import { CarConsultDto, RegisterCarDto } from '../dtos/car.dto';
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
                const getUser = await this.userService.getUser(dataCar.user.dni);
                if (!getUser) {
                    dataUser = await this.userService.createUser(dataCar.user);
                    dataCar.user = dataUser._id;
                } else {
                    dataCar.user = getUser._id;
                }
            }


            const car = await new this.CarModel(dataCar).save();

            return car;
        } catch (error) {
            throw error;
        }
    }

    async checkRegister(dataCar: CarConsultDto) {

        try {

            if (dataCar?.placa) {
                const car = await this.CarModel.findOne({ placa: dataCar.placa });

                return car;
            }
            return null
        } catch (error) {
            throw error;
        }
    }
}
