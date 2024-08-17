import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Exercise } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ExerciseDto } from './dto/exercise.dto';

interface IExerciseService {
  create(dto: ExerciseDto): Promise<Exercise | null>;
  getById(exerciseId: number): Promise<Exercise | null>;
  getByWorkoutId(workoutId: number): Promise<Exercise[] | null>;
  delete(exerciseId: number): Promise<Exercise | null>;
}

@Injectable()
export class ExerciseService implements IExerciseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ExerciseDto): Promise<Exercise | null> {
    try {
      const exercise = await this.prisma.exercise.create({
        data: {
          workout: { connect: { id: dto.workoutId } },
          exerciseType: { connect: { id: dto.exerciseTypeId } },
        },
      });

      if (!exercise)
        throw new InternalServerErrorException('Server error while creating' + ' exercise');

      return exercise;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create exercise', error.message);
    }
  }

  async getById(exerciseId: number): Promise<Exercise | null> {
    try {
      const exercise = await this.prisma.exercise.findUnique({
        where: {
          id: exerciseId,
        },
        include: {
          sets: true,
          exerciseType: true,
        },
      });

      if (!exercise) throw new NotFoundException('Exercise not found');

      return exercise;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get exercise', error.message);
    }
  }

  async getByWorkoutId(workoutId: number): Promise<Exercise[] | null> {
    try {
      const exerciseType = await this.prisma.exercise.findMany({
        where: {
          workoutId: workoutId,
        },
      });

      if (!exerciseType) throw new NotFoundException('Server error');

      return exerciseType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get exercises', error.message);
    }
  }

  async delete(exerciseId: number): Promise<Exercise | null> {
    try {
      const exercise = await this.prisma.exercise.delete({
        where: {
          id: exerciseId,
        },
      });

      if (!exercise) throw new InternalServerErrorException('Server error');

      return exercise;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete exercise', error.message);
    }
  }
}
