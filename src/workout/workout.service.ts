import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma, Workout } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { WorkoutDto, WorkoutUpdateDto } from './dto/workout.dto';

interface IWorkoutService {
  create(userId: number, dto: WorkoutDto): Promise<Workout | null>;
  getById(workoutTypeId: number): Promise<Workout | null>;
  getAll(userId: number): Promise<Workout[] | null>;
  update(workoutTypeId: number, dto: WorkoutDto): Promise<Workout | null>;
  delete(workoutTypeId: number): Promise<Workout | null>;
}

@Injectable()
export class WorkoutService implements IWorkoutService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: WorkoutDto): Promise<Workout | null> {
    try {
      const workout = await this.prisma.workout.create({
        data: {
          name: dto.name,
          date: dto.date,
          status: dto.status,
          duration: dto.duration,
          user: {
            connect: { id: userId },
          },
          workoutType: {
            connect: { id: dto.workoutTypeId },
          },
        },
      });

      if (!workout) throw new InternalServerErrorException('Server error');

      return workout;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }

  async getById(workoutId: number): Promise<Workout | null> {
    try {
      const workout = await this.prisma.workout.findUnique({
        where: {
          id: workoutId,
        },
      });

      if (!workout) throw new InternalServerErrorException('Workout was not found');

      return workout;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }

  async getAll(userId: number): Promise<Workout[] | null> {
    const workoutType = await this.prisma.workout.findMany({
      where: {
        userId: userId,
      },
    });

    if (!workoutType) throw new InternalServerErrorException('Workouts was not found');

    return workoutType;
  }

  async update(workoutId: number, dto: WorkoutUpdateDto): Promise<Workout | null> {
    const currentWorkout = await this.getById(workoutId);

    if (!currentWorkout) {
      throw new NotFoundException('Workout not found');
    }

    const updateData: Prisma.WorkoutUpdateInput = {};

    if (dto.name !== undefined) {
      updateData.name = dto.name;
    }

    if (dto.isFavorite !== undefined) {
      updateData.isFavorite = dto.isFavorite;
    }

    if (dto.date !== undefined) {
      updateData.date = dto.date;
    }

    if (dto.status !== undefined) {
      updateData.status = dto.status;
    }

    if (dto.duration !== undefined) {
      updateData.duration = dto.duration;
    }

    if (Object.keys(updateData).length === 0) {
      return currentWorkout;
    }

    if (dto.workoutTypeId !== undefined) {
      updateData.workoutType = {
        connect: { id: dto.workoutTypeId },
      };
    }

    const workoutType = await this.prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: updateData,
    });

    if (!workoutType) throw new InternalServerErrorException('Server error');

    return workoutType;
  }

  async delete(workoutId: number): Promise<Workout | null> {
    const workout = await this.prisma.workout.delete({
      where: {
        id: workoutId,
      },
    });

    if (!workout) throw new InternalServerErrorException('Server error');

    return workout;
  }
}
