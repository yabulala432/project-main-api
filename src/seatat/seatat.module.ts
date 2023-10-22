import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SeatatService } from './seatat.service';
import { SeatatController } from './seatat.controller';
import { SeatatSchema, Seatat } from './seatat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seatat.name, schema: SeatatSchema }]),
  ],
  providers: [SeatatService],
  controllers: [SeatatController],
})
export class SeatatModule {}
