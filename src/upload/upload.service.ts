import sharp from 'sharp';
import { Injectable } from '@nestjs/common';
import { Upload, UploadSchema } from './upload.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId, Binary } from 'mongodb';
import { response } from 'express';

export interface image {
  _id: ObjectId;
  image: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
}

@Injectable()
export class UploadService {
  constructor(@InjectModel(Upload.name) private uploadModel: Model<Upload>) {}

  async uploadFile(file: any): Promise<any> {
    console.log({ file });
    const upload = new this.uploadModel({
      image: file,
    });
    return upload.save();
  }

  async getImage(id: string): Promise<any> {
    const upload = await this.uploadModel.findById<image>(id).exec();
    return upload;
  }

  async sendQualityImage(
    id: string,
    res: any,
    height?: number,
    saturation?: number,
    hue?: number,
    lightness?: number,
    sigma?: number,
  ): Promise<any> {
    const { image }: image = await this.getImage(id);
    const base64String = image.buffer.toString('base64');
    const mimeType = image.mimetype;
    const data = Buffer.from(base64String, 'base64');
    const resizedBuffer: Buffer = await sharp(data)
      .resize({
        height: height || 350,
      })
      .modulate({
        saturation: saturation || 5,
        hue: hue || 25,
        lightness: lightness || 10,
      })
      .sharpen({
        sigma: sigma || 1.3,
      })
      .toBuffer();

    res.set('Content-Type', mimeType);
    res.send(resizedBuffer);
  }
}
