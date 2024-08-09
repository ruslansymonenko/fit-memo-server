import { Module } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { MeasureController } from './measure.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MeasureController],
  providers: [MeasureService, PrismaService],
})
export class MeasureModule {}
