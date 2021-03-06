import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async createUser(dataUser: Object) {
        try {
            const user = await new this.userModel(dataUser).save();

            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUser(dni: string) {
        try {
            const user = await this.userModel.findOne({dni: dni});

            return user ? user : null;
        } catch (error) {
            throw error;
        }
    }
}
