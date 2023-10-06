import { Module } from '@nestjs/common';
import { KdaseController } from './kdase.controller';
import { KdaseService } from './kdase.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Kdase, KdaseSchema } from './kdase.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Kdase.name, schema: KdaseSchema }]),
  ],
  controllers: [KdaseController],
  providers: [KdaseService],
})
export class KdaseModule {}
