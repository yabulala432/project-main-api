import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Upload {
  amharicImage: Express.Multer.File;
  geezImage: Express.Multer.File;
  audio: Express.Multer.File;
  description: string;
  title: string;
}

@Schema()
export class Upload extends Document {
  @Prop({
    type: Object,
    required: true,
  })
  amharicImage: Express.Multer.File;

  @Prop({
    type: Object,
    required: true,
  })
  geezImage: Express.Multer.File;

  @Prop({
    type: Object,
    required: true,
  })
  audio: Express.Multer.File;

  @Prop({
    type: Object,
    required: true,
  })
  description: string;

  @Prop({
    type: Object,
    required: true,
  })
  title: string;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
