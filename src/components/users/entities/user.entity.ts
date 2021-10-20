import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Car } from '../../cars/entities/car.entity';



const schemaOptions = {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
}

@Schema(schemaOptions)
export class User extends Document {
    @Prop({ required: true, unique: true })
    dni: string;

    @Prop({ required: true })
    nombre: string;

    @Prop({ required: true })
    apellido: string;

    @Prop({ required: false })
    email: string;

    @Prop({ required: false })
    password: string;

    /* @Prop({ type: [{ type: Types.ObjectId, ref: Car.name }], required: false })
    cars: Types.Array<Car>; */

    @Prop()
    fechaCreacion: Date;

    @Prop()
    fechaActualizacion: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
