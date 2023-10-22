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
import { SeatatService } from './seatat.service';

@Controller('kdase')
export class KdaseController {
  constructor(private readonly uploadService: SeatatService) {}

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

  @Get('/zema/audio/:title')
  async getAudio(@Param('title') title: string, @Res() res: any) {
    return this.uploadService.getZema(title, res);
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
