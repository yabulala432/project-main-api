import { Module } from '@nestjs/common';
import { KdaseController } from './kdase.controller';
import { KdaseService } from './kdase.service';

@Module({
  controllers: [KdaseController],
  providers: [KdaseService]
})
export class KdaseModule {}
