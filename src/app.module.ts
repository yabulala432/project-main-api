import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from './upload/upload.module';
import { KdaseModule } from './kdase/kdase.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    UploadModule,
    KdaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
