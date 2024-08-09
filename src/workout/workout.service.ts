import { Injectable } from '@nestjs/common';
import { Workout } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { WorkoutDto } from './dto/workout.dto';

interface IWorkoutService {
  // create(dto: WorkoutDto): Promise<Workout | null>;
}

@Injectable()
export class WorkoutService implements IWorkoutService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  // create(dto: WorkoutDto): Promise<Workout | null> {}
}
