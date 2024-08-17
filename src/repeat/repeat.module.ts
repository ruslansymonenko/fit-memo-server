import { Module } from '@nestjs/common';
import { RepeatService } from './repeat.service';
import { RepeatController } from './repeat.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [RepeatController],
  providers: [RepeatService, PrismaService],
})
export class RepeatModule {}
