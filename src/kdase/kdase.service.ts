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

  async getGeezAudio(title: string, res: any) {
    const data = await this.getDataWithTitle(title);
    if (!data) {
      res.status(404).send('Not found');
      return;
    }
    const { geezAudio } = data;
    const base64String = geezAudio.buffer.toString('base64');
    const mimeType = geezAudio.mimetype;
    const audioBuffer = Buffer.from(base64String, 'base64');
    res.set('Content-Type', mimeType);
    res.send(audioBuffer);
  }

  async getEzlAudio(title: string, res: any) {
    const data = await this.getDataWithTitle(title);
    if (!data || !data.ezlAudio) {
      res.status(404).send('Not found');
      return;
    }

    const { ezlAudio } = data;
    const base64String = ezlAudio.buffer.toString('base64');
    const mimeType = ezlAudio.mimetype;
    const audioBuffer = Buffer.from(base64String, 'base64');
    res.set('Content-Type', mimeType);
    res.send(audioBuffer);
  }

  async uploadFile(images: Express.Multer.File[], data: any): Promise<any> {
    if (images.length === 3 || images.length === 4) {
      if (
        images[0].fieldname === 'amharic' &&
        images[1].fieldname === 'geez' &&
        images[2].fieldname === 'geezAudio' &&
        data.title &&
        data.description
      ) {
        let ezlAudio: null | Express.Multer.File = null;

        if (images[3] && images[3].fieldname === 'ezlAudio') {
          ezlAudio = images[3];
        }

        const upload = new this.uploadModel({
          amharicImage: images[0],
          geezImage: images[1],
          geezAudio: images[2],
          ezlAudio: ezlAudio || null,
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
