import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Configuration } from './configuration.entity';



const schemaOptions = {
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion' }
}

@Schema(schemaOptions)
export class Traffic extends Document {
    @Prop({ required: true })
    tipo: string;

    @Prop({ required: true })
    estado: string;

    @Prop({ required: true })
    fechaInicio: Date;

    @Prop({ required: false })
    fechaFin: Date;

    @Prop({ required: true, default: false })
    default: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: Configuration.name }], })
    configuration: Types.Array<Configuration>;

    @Prop()
    fechaCreacion: Date;

    @Prop()
    fechaActualizacion: Date;
}

export const TrafficSchema = SchemaFactory.createForClass(Traffic);
