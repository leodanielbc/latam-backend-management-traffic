import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';



const schemaOptions = {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
}

@Schema(schemaOptions)
export class Car extends Document {
    @Prop({ required: true })
    placa: string;

    @Prop({ required: false })
    color: string;

    @Prop({ required: true })
    modelo: string;

    @Prop({ required: true })
    usuario: string;

    @Prop()
    fechaCreacion: Date;

    @Prop()
    fechaActualizacion: Date;
}

export const CarSchema = SchemaFactory.createForClass(Car);
