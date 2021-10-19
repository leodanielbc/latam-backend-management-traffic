import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';



const schemaOptions = {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
}

@Schema(schemaOptions)
export class Configuration extends Document {
    @Prop({ required: true })
    placas: string;

    @Prop({ required: true })
    estado: string;

    @Prop({ required: true })
    default: string;

    @Prop({ required: true })
    fechaInicio: Date;

    @Prop({ required: false })
    fechaFin: Date;

    @Prop()
    fechaCreacion: Date;

    @Prop()
    fechaActualizacion: Date;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
