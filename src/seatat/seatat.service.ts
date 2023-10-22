import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import sharp from 'sharp';
import { Seatat } from './seatat.schema';

@Injectable()
export class SeatatService {
  constructor(@InjectModel(Seatat.name) private uploadModel: Model<Seatat>) {}

  private async getDataWithTitle(title: string): Promise<Seatat> {
    const data = await this.uploadModel
      .findOne<Seatat>({ title: title })
      .exec();
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

  async uploadFile(images: Express.Multer.File[], data: any): Promise<any> {
    /**
      fieldname: string;
      originalname: string;
      encoding: string; 
      mimetype: string; 
      size: number;
      stream: Readable;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    */

    if (images.length === 3) {
      if (
        images[0].fieldname === 'amharic' &&
        images[1].fieldname === 'geez' &&
        images[2].fieldname === 'zema' &&
        data.title &&
        data.description
      ) {
        const upload = new this.uploadModel({
          amharicImage: images[0],
          geezImage: images[1],
          zema: images[2],
          title: data.title,
          description: data.description,
        });
        return upload.save();
      }
    } else {
      return 'Please upload all the required files';
    }
  }

  async getAllTitles(): Promise<string[]> {
    const data = await this.uploadModel.find().select('-_id title').exec();
    const titles = data.map((d) => d.title);
    return titles.sort();
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

  /*
  *async getGeezAudio(title: string, res: any) {
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
  }**/

  async getZema(title: string, res: any) {
    const data = await this.getDataWithTitle(title);
    if (!data || !data.zema) {
      res.status(404).send('Not found');
      return;
    }

    const { zema } = data;
    const base64String = zema.buffer.toString('base64');
    const mimeType = zema.mimetype;
    const audioBuffer = Buffer.from(base64String, 'base64');
    res.set('Content-Type', mimeType);
    res.send(audioBuffer);
  }

  async getAllData(): Promise<Seatat[]> {
    const data: any[] = await this.uploadModel.find().exec();
    data.forEach(async (d) => {
      d.amharicImage = `data:${
        d.amharicImage.mimetype
      };base64,${d.amharicImage.buffer.toString('base64')}`;
      d.geezImage = `data:${
        d.geezImage.mimetype
      };base64,${d.geezImage.buffer.toString('base64')}`;
      d.geezAudio = `data:${
        d.geezAudio.mimetype
      };base64,${d.geezAudio.buffer.toString('base64')}`;
      if (d.ezlAudio) {
        d.ezlAudio = `data:${
          d.ezlAudio.mimetype
        };base64,${d.ezlAudio.buffer.toString('base64')}`;
      }
    });
    return data.sort((a, b) => a.title.localeCompare(b.title));
  }
}
