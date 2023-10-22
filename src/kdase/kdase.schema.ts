import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Kdase {
  amharicImage: Express.Multer.File;
  geezImage: Express.Multer.File;

  ezlAudio: Express.Multer.File | null;
  geezAudio: Express.Multer.File;

  description: string;
  title: string;
}

@Schema()
export class Kdase extends Document {
  @Prop({
    type: Object,
    required: true,
    unique: true,
  })
  amharicImage: Express.Multer.File;

  @Prop({
    type: Object,
    required: true,
    unique: true,
  })
  geezImage: Express.Multer.File;

  @Prop({
    type: Object,
    required: false,
  })
  ezlAudio: Express.Multer.File;

  @Prop({
    type: Object,
    required: true,
    unique: true,
  })
  geezAudio: Express.Multer.File;

  @Prop({
    type: Object,
    required: true,
    unique: true,
  })
  description: string;

  @Prop({
    type: Object,
    required: true,
    unique: true,
  })
  title: string;
}

export const KdaseSchema = SchemaFactory.createForClass(Kdase);
