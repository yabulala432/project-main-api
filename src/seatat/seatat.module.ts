import { Module } from '@nestjs/common';
import { SeatatService } from './seatat.service';
import { SeatatController } from './seatat.controller';

@Module({
  providers: [SeatatService],
  controllers: [SeatatController]
})
export class SeatatModule {}
