import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';



const schemaOptions = {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
}

@Schema(schemaOptions)
export class Configuration extends Document {
    @Prop({ required: true })
    placas: Array<number>;

    @Prop({ required: true })
    tipo: string;

    @Prop({ required: false })
    diaSemana: Array<number>;

    @Prop({ required: false, default: 'ACTIVO'})
    estado: string;

    @Prop()
    fechaCreacion: Date;

    @Prop()
    fechaActualizacion: Date;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
