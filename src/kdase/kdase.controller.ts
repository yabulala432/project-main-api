import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { KdaseService } from './kdase.service';

@Controller('kdase')
export class KdaseController {
  constructor(private readonly uploadService: KdaseService) {}

  @Post('/uploadFile')
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: {
        files: 4,
        fields: 2,
      },
    }),
  )
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() data: any,
  ) {
    return this.uploadService.uploadFile(images, data);
  }

  @Get('/amharic/image/:title')
  async getAmharicImage(@Param('title') title: string, @Res() res: any) {
    return this.uploadService.getAmharicImage(title, res);
  }

  @Get('/geez/image/:title')
  async getGeezImage(@Param('title') title: string, @Res() res: any) {
    return this.uploadService.getGeezImage(title, res);
  }

  @Get('/geez/audio/:title')
  async getAudio(@Param('title') title: string, @Res() res: any) {
    return this.uploadService.getGeezAudio(title, res);
  }

  @Get('/ezl/audio/:title')
  async getEzlAudio(@Param('title') title: string, @Res() res: any) {
    return this.uploadService.getEzlAudio(title, res);
  }

  @Get('/titles')
  async getAllTitles() {
    return this.uploadService.getAllTitles();
  }

  @Get('/getAll')
  async getAllData() {
    return this.uploadService.getAllData();
  }
}
