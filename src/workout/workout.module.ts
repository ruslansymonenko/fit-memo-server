import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [WorkoutController],
  providers: [WorkoutService, PrismaService, UserService],
})
export class WorkoutModule {
  constructor() {}
}
