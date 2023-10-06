import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import sharp from 'sharp';
import { Kdase } from './kdase.schema';

@Injectable()
export class KdaseService {
  constructor(@InjectModel(Kdase.name) private uploadModel: Model<Kdase>) {}
  private async getDataWithTitle(title: string): Promise<Kdase> {
    const data = await this.uploadModel.findOne<Kdase>({ title: title }).exec();
    return data;
  }
  private async resizeImage(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
      .resize({ height: 350 })
      .modulate({
        saturation: 5,
        hue: 25,
        lightness: 10,
      })
      .sharpen({
        sigma: 1.3,
      })
      .toBuffer();
  }
  async getAmharicImage(title: string, res: any) {
    const data = await this.getDataWithTitle(title);
    if (!data) {
      res.status(404).send('Not found');
      return;
    }
    const { amharicImage } = data;
    const base64String = amharicImage.buffer.toString('base64');
    const mimeType = amharicImage.mimetype;
    const geezBuffer = Buffer.from(base64String, 'base64');
    const resizedBuffer: Buffer = await this.resizeImage(geezBuffer);
    res.set('Content-Type', mimeType);
    res.send(resizedBuffer);
  }
  async getGeezImage(title: string, res: any) {
    const data = await this.getDataWithTitle(title);
    if (!data) {
      res.status(404).send('Not found');
      return;
    }
    const { geezImage } = data;
    const base64String = geezImage.buffer.toString('base64');
    const mimeType = geezImage.mimetype;
    const geezBuffer = Buffer.from(base64String, 'base64');
    const resizedBuffer: Buffer = await this.resizeImage(geezBuffer);
    res.set('Content-Type', mimeType);
    res.send(resizedBuffer);
  }
  async getAudio(title: string, res: any) {
    const data = await this.getDataWithTitle(title);
    if (!data) {
      res.status(404).send('Not found');
      return;
    }
    const { audio } = data;
    const base64String = audio.buffer.toString('base64');
    const mimeType = audio.mimetype;
    const audioBuffer = Buffer.from(base64String, 'base64');
    res.set('Content-Type', mimeType);
    res.send(audioBuffer);
  }
  async uploadFile(images: Express.Multer.File[], data: any): Promise<any> {
    if (images.length === 3) {
      if (
        images[0].fieldname === 'amharic' &&
        images[1].fieldname === 'geez' &&
        images[2].fieldname === 'audio' &&
        data.title &&
        data.description
      ) {
        const upload = new this.uploadModel({
          amharicImage: images[0],
          geezImage: images[1],
          audio: images[2],
          title: data.title,
          description: data.description,
        });
        return upload.save();
      }
      // const kdase =
    } else {
      return 'Please upload all the required files';
    }
  }
}
