import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, WorkoutType } from '@prisma/client';
import { WorkoutTypeDto } from './dto/workout-type.dto';

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

    if (!workoutType) throw new InternalServerErrorException('Server error');

    return workoutType;
  }

  async getById(workoutTypeId: number): Promise<WorkoutType | null> {
    const workoutType = await this.prisma.workoutType.findUnique({
      where: {
        id: workoutTypeId,
      },
    });

    if (!workoutType) throw new InternalServerErrorException('Server error');

    return workoutType;
  }

  async getAll(userId: number): Promise<WorkoutType[] | null> {
    const workoutType = await this.prisma.workoutType.findMany({
      where: {
        userId: userId,
      },
    });

    if (!workoutType) throw new InternalServerErrorException('Server error');

    return workoutType;
  }

  async update(workoutTypeId: number, dto: WorkoutTypeDto): Promise<WorkoutType | null> {
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
  }

  async delete(workoutTypeId: number): Promise<WorkoutType | null> {
    const workoutType = await this.prisma.workoutType.delete({
      where: {
        id: workoutTypeId,
      },
    });

    if (!workoutType) throw new InternalServerErrorException('Server error');

    return workoutType;
  }
}
