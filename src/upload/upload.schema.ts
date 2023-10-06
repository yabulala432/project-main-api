import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { buffer } from 'stream/consumers';

export interface Upload {
  image: object;
}
@Schema()
export class Upload extends Document {
  @Prop({ type: Object, required: true })
  image: object;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
