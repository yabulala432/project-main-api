import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadSchema } from './upload.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
