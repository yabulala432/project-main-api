import { buffer } from 'stream/consumers';
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService, image } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import sharp from 'sharp';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: any) {
    return this.uploadService.uploadFile(file);
  }

  @Get('/:id')
  async getImage(@Param('id') id: string, @Res() res: any) {
    return this.uploadService.sendQualityImage(id, res);
  }
}
