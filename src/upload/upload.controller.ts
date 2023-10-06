import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import sharp from 'sharp';
import { UploadService, image } from './upload.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload } from './upload.schema';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    @InjectModel(Upload.name) private uploadModel: Model<Upload>,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: any) {
    return this.uploadService.uploadFile(file);
  }

  @Get('/:id')
  async getImage(@Param('id') id: string, @Res() res: any) {
    return this.uploadService.sendQualityImage(id, res);
  }

  @Post('/any')
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: {
        files: 3,
        fields: 2,
      },
    }),
  )
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() data: any,
  ) {
    /**
     * console.log({ images, data });
     * console.log(images[0].fieldname.includes
     * ('amharic'));
     */
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
        // console.log(upload.schema);
        upload
          .save()
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log('====================================');
            console.log(err);
            ('====================================');
          });
      }
      // const kdase =
    }
  }

  @Get('/any/:id')
  async getAll(@Param('id') id: string) {
    const data = await this.uploadModel.findById<Upload>(id).exec();
    const { amharicImage, geezImage, audio, title, description } = data;
    const base64Strings:string[] = [];
    
    base64Strings.push(amharicImage.buffer.toString('base64'));
    base64Strings.push(geezImage.buffer.toString('base64'));
    base64Strings.push(audio.buffer.toString('base64'));

    const mimeTypes:string[] = [];
    mimeTypes.push(amharicImage.mimetype);
    mimeTypes.push(geezImage.mimetype);
    mimeTypes.push(audio.mimetype);

    const resizedBuffers:Buffer[] = [];
    const amharicResizedBuffer = await sharp(data).resize({})

    

}
