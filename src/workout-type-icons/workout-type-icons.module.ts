import { Module } from '@nestjs/common';
import { WorkoutTypeIconsService } from './workout-type-icons.service';
import { WorkoutTypeIconsController } from './workout-type-icons.controller';
import { PrismaService } from '../prisma.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [WorkoutTypeIconsController],
  providers: [WorkoutTypeIconsService, PrismaService, FileService],
})
export class WorkoutTypeIconsModule {}
