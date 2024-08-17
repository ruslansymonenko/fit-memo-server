import { Module } from '@nestjs/common';
import { ExerciseTypeService } from './exercise-type.service';
import { ExerciseTypeController } from './exercise-type.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ExerciseTypeController],
  providers: [ExerciseTypeService, PrismaService],
})
export class ExerciseTypeModule {}
