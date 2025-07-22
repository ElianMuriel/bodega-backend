import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
  action: string;

  @Prop()
  user?: string;

  @Prop()
  details?: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
