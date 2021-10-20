import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';



const schemaOptions = {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
}

@Schema(schemaOptions)
export class Car extends Document {
    @Prop({ required: true, unique: true })
    placa: string;

    @Prop({ required: false })
    color: string;

    @Prop({ required: true })
    modelo: string;

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User | Types.ObjectId;

    @Prop()
    fechaCreacion: Date;

    @Prop()
    fechaActualizacion: Date;

}

export const CarSchema = SchemaFactory.createForClass(Car);
