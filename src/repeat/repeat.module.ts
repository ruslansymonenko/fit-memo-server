import { Module } from '@nestjs/common';
import { RepeatService } from './repeat.service';
import { RepeatController } from './repeat.controller';

@Module({
  controllers: [RepeatController],
  providers: [RepeatService],
})
export class RepeatModule {}
