import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Seatat {
  amharicImage: Express.Multer.File;
  geezImage: Express.Multer.File;

  zema: Express.Multer.File | null;

  description: string;
  title: string;
}

@Schema()
export class Seatat extends Document {
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
  zema: Express.Multer.File;

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

export const SeatatSchema = SchemaFactory.createForClass(Seatat);