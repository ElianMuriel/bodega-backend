import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ timestamps: true }) // crea createdAt y updatedAt
export class Log {
  @Prop({ required: true })
  action: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  userId: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
