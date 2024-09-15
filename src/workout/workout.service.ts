import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EnumWorkoutStatus, Prisma, Workout } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { WorkoutDto, WorkoutUpdateDto } from './dto/workout.dto';
import { AddTagsDto } from './dto/addTags.dto';

interface IWorkoutService {
  create(userId: number, dto: WorkoutDto): Promise<Workout | null>;
  getById(workoutId: number): Promise<Workout | null>;
  getAll(userId: number): Promise<Workout[] | null>;
  update(workoutId: number, dto: WorkoutDto): Promise<Workout | null>;
  toggleTags(workoutId: number, type: TypeToggleTags, dto: AddTagsDto): Promise<Workout | null>;
  delete(workoutId: number): Promise<Workout | null>;
}

export type TypeToggleTags = 'add' | 'remove';

@Injectable()
export class WorkoutService implements IWorkoutService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: WorkoutDto): Promise<Workout | null> {
    let defaultStatus = EnumWorkoutStatus.NEW;

    try {
      const workout = await this.prisma.workout.create({
        data: {
          name: dto.name,
          date: dto.date,
          status: dto.status ? dto.status : defaultStatus,
          duration: dto.duration ? dto.duration : 0,
          user: {
            connect: { id: userId },
          },
          workoutType: {
            connect: { id: dto.workoutTypeId },
          },
        },
        include: {
          tags: true,
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
        include: {
          tags: true,
          exercises: {
            include: {
              exerciseType: {
                include: {
                  measure: true,
                },
              },
              sets: {
                include: {
                  repeats: true,
                },
              },
            },
          },
          workoutType: {
            include: {
              workoutTypeIcon: true,
            },
          },
        },
      });

      if (!workout) throw new InternalServerErrorException('Workout was not found');

      return workout;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get Workout', error.message);
    }
  }

  async getAll(userId: number): Promise<Workout[] | null> {
    try {
      const workoutType = await this.prisma.workout.findMany({
        where: {
          userId: userId,
        },
        include: {
          tags: true,
          workoutType: {
            include: { workoutTypeIcon: true },
          },
        },
      });

      if (!workoutType) throw new InternalServerErrorException('Workouts was not found');

      return workoutType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get Workouts', error.message);
    }
  }

  async update(workoutId: number, dto: WorkoutUpdateDto): Promise<Workout | null> {
    try {
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

      if (dto.workoutTypeId !== undefined) {
        updateData.workoutType = {
          connect: { id: dto.workoutTypeId },
        };
      }

      // if (dto.tagIds !== undefined) {
      //   updateData.tags = {
      //     connect: dto.tagIds.map((id: number): { id: number } => ({ id })),
      //   };
      // }

      if (Object.keys(updateData).length === 0) {
        return currentWorkout;
      }

      const workoutType = await this.prisma.workout.update({
        where: {
          id: workoutId,
        },
        data: updateData,
        include: {
          tags: true,
        },
      });

      if (!workoutType) throw new InternalServerErrorException('Server error');

      return workoutType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update Workout', error.message);
    }
  }

  async toggleTags(
    workoutId: number,
    type: TypeToggleTags,
    dto: AddTagsDto,
  ): Promise<Workout | null> {
    try {
      const currentWorkout = await this.getById(workoutId);

      if (!currentWorkout) {
        throw new NotFoundException('Workout not found');
      }

      const updateData: Prisma.WorkoutUpdateInput = {};

      if (type === 'add') {
        if (dto.tagIds !== undefined) {
          updateData.tags = {
            connect: dto.tagIds.map((id: number): { id: number } => ({ id })),
          };
        }
      } else if (type === 'remove') {
        if (dto.tagIds !== undefined) {
          updateData.tags = {
            disconnect: dto.tagIds.map((id: number): { id: number } => ({ id })),
          };
        }
      }

      if (Object.keys(updateData).length === 0) {
        return currentWorkout;
      }

      const workout = await this.prisma.workout.update({
        where: {
          id: workoutId,
        },
        data: updateData,
        include: {
          tags: true,
        },
      });

      if (!workout) throw new InternalServerErrorException('Server error');

      return workout;
    } catch (error) {
      throw new InternalServerErrorException('Failed to add tags to workout', error.message);
    }
  }

  async delete(workoutId: number): Promise<Workout | null> {
    try {
      const workout = await this.prisma.workout.delete({
        where: {
          id: workoutId,
        },
      });

      if (!workout) throw new InternalServerErrorException('Server error');

      return workout;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete Workout', error.message);
    }
  }
}
