import { Module } from '@nestjs/common';
import { WorkoutTypeService } from './workout-type.service';
import { WorkoutTypeController } from './workout-type.controller';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { WorkoutTypeIconsService } from '../workout-type-icons/workout-type-icons.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [WorkoutTypeController],
  providers: [WorkoutTypeService, PrismaService, UserService, WorkoutTypeIconsService, FileService],
})
export class WorkoutTypeModule {}
