import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, WorkoutType } from '@prisma/client';
import { WorkoutTypeDto, WorkoutUpdateTypeDto } from './dto/workout-type.dto';

interface IWorkoutTypeService {
  create(userId: number, dto: WorkoutTypeDto): Promise<WorkoutType | null>;
  getById(workoutTypeId: number): Promise<WorkoutType | null>;
  getAll(userId: number): Promise<WorkoutType[] | null>;
  update(workoutTypeId: number, dto: WorkoutTypeDto): Promise<WorkoutType | null>;
  delete(workoutTypeId: number): Promise<WorkoutType | null>;
}

@Injectable()
export class WorkoutTypeService implements IWorkoutTypeService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: WorkoutTypeDto): Promise<WorkoutType | null> {
    console.log(dto);
    try {
      let workoutTypeDefaultIcon: number = dto.iconId ? dto.iconId : 1;

      const workoutType = await this.prisma.workoutType.create({
        data: {
          name: dto.name,
          user: {
            connect: { id: userId },
          },
          workoutTypeIcon: { connect: { id: workoutTypeDefaultIcon } },
        },
      });

      if (!workoutType)
        throw new InternalServerErrorException('Server error while creating' + ' workout type');

      return workoutType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }

  async getById(workoutTypeId: number): Promise<WorkoutType | null> {
    try {
      const workoutType = await this.prisma.workoutType.findUnique({
        where: {
          id: workoutTypeId,
        },
        include: {
          workoutTypeIcon: true,
        },
      });

      if (!workoutType) throw new InternalServerErrorException('Workout type not found');

      return workoutType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get WorkoutType', error.message);
    }
  }

  async getAll(userId: number): Promise<WorkoutType[] | null> {
    try {
      const workoutType = await this.prisma.workoutType.findMany({
        where: {
          userId: userId,
        },
        include: {
          workoutTypeIcon: true,
        },
      });

      if (!workoutType) throw new InternalServerErrorException('Server error');

      return workoutType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get Workout Types', error.message);
    }
  }

  async update(workoutTypeId: number, dto: WorkoutUpdateTypeDto): Promise<WorkoutType | null> {
    try {
      const currentWorkoutType = await this.getById(workoutTypeId);

      if (!currentWorkoutType) {
        throw new NotFoundException('WorkoutType not found');
      }

      const updateData: Prisma.WorkoutTypeUpdateInput = {};

      if (dto.name !== undefined) {
        updateData.name = dto.name;
      }

      if (dto.isFavorite !== undefined) {
        updateData.isFavorite = dto.isFavorite;
      }

      if (dto.iconId !== undefined) {
        updateData.workoutTypeIcon = {
          connect: { id: dto.iconId },
        };
      }

      if (Object.keys(updateData).length === 0) {
        return currentWorkoutType;
      }

      const workoutType = await this.prisma.workoutType.update({
        where: {
          id: workoutTypeId,
        },
        data: updateData,
      });

      if (!workoutType) throw new InternalServerErrorException('Server error');

      return workoutType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update WorkoutType', error.message);
    }
  }

  async delete(workoutTypeId: number): Promise<WorkoutType | null> {
    try {
      const workoutType = await this.prisma.workoutType.delete({
        where: {
          id: workoutTypeId,
        },
      });

      if (!workoutType) throw new InternalServerErrorException('Server error');

      return workoutType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete WorkoutType', error.message);
    }
  }
}
