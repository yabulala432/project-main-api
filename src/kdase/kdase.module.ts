import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { KdaseController } from './kdase.controller';
import { KdaseService } from './kdase.service';
import { Kdase, KdaseSchema } from './kdase.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Kdase.name, schema: KdaseSchema }]),
  ],
  controllers: [KdaseController],
  providers: [KdaseService],
})
export class KdaseModule {}
