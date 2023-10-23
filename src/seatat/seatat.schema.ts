import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Seatat {
  amharicImage: Express.Multer.File;
  geezImage: Express.Multer.File;

  geezAudio: Express.Multer.File;

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
    required: true,
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

export const SeatatSchema = SchemaFactory.createForClass(Seatat);
