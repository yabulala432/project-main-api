import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// import { UploadModule } from './upload/upload.module';
import { KdaseModule } from './kdase/kdase.module';
import { SeatatModule } from './seatat/seatat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mainProject'),
    // UploadModule,
    KdaseModule,
    SeatatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
