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
import { UploadService } from './upload.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/uploadFile')
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
    return this.uploadService.uploadFile(images, data);
  }

  @Get('/amharic/:title')
  async getAmharicImage(@Param('title') title: string, @Res() res: any) {
    return this.uploadService.getAmharicImage(title, res);
  }

  @Get('/geez/:title')
  async getGeezImage(@Param('title') title: string, @Res() res: any) {
    return this.uploadService.getGeezImage(title, res);
  }

  @Get('/audio/:title')
  async getAudio(@Param('title') title: string, @Res() res: any) {
    return this.uploadService.getAudio(title, res);
  }
}
