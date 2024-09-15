import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ExerciseType, Prisma } from '@prisma/client';
import { ExerciseTypeDto, ExerciseTypeUpdateDto } from './dto/exercise-type.dto';

interface IWorkoutTypeService {
  create(userId: number, dto: ExerciseTypeDto): Promise<ExerciseType | null>;
  getById(exerciseTypeId: number): Promise<ExerciseType | null>;
  getAll(userId: number): Promise<ExerciseType[] | null>;
  update(exerciseTypeId: number, dto: ExerciseTypeUpdateDto): Promise<ExerciseType | null>;
  delete(exerciseTypeId: number): Promise<ExerciseType | null>;
}

@Injectable()
export class ExerciseTypeService implements IWorkoutTypeService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: ExerciseTypeDto): Promise<ExerciseType | null> {
    try {
      const exerciseType = await this.prisma.exerciseType.create({
        data: {
          name: dto.name,
          user: {
            connect: { id: userId },
          },
          measure: {
            connect: { id: dto.measureId },
          },
        },
        include: {
          measure: true,
        },
      });

      if (!exerciseType)
        throw new InternalServerErrorException('Server error while creating' + ' exercise type');

      return exerciseType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create exercise type', error.message);
    }
  }

  async getById(exerciseTypeId: number): Promise<ExerciseType | null> {
    try {
      const exerciseType = await this.prisma.exerciseType.findUnique({
        where: {
          id: exerciseTypeId,
        },
        include: {
          measure: true,
        },
      });

      if (!exerciseType) throw new InternalServerErrorException('Exercise type not found');

      return exerciseType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get exercise type', error.message);
    }
  }

  async getAll(userId: number): Promise<ExerciseType[] | null> {
    try {
      const exerciseType = await this.prisma.exerciseType.findMany({
        where: {
          userId: userId,
        },
        include: {
          measure: true,
        },
      });

      if (!exerciseType) throw new InternalServerErrorException('Server error');

      return exerciseType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get exercise types', error.message);
    }
  }

  async update(exerciseTypeId: number, dto: ExerciseTypeUpdateDto): Promise<ExerciseType | null> {
    console.log(dto);
    try {
      const currentExerciseType = await this.getById(exerciseTypeId);

      if (!currentExerciseType) {
        throw new NotFoundException('Exercise type not found');
      }

      const updateData: Prisma.ExerciseTypeUpdateInput = {};

      if (dto.name !== undefined) {
        updateData.name = dto.name;
      }

      if (dto.measureId !== undefined) {
        updateData.measure = {
          connect: { id: dto.measureId },
        };
      }

      if (dto.isFavorite !== undefined) {
        updateData.isFavorite = dto.isFavorite;
      }

      if (Object.keys(updateData).length === 0) {
        return currentExerciseType;
      }

      const exerciseType = await this.prisma.exerciseType.update({
        where: {
          id: exerciseTypeId,
        },
        data: updateData,
        include: {
          measure: true,
        },
      });

      if (!exerciseType) throw new InternalServerErrorException('Server error');

      return exerciseType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update exercise type', error.message);
    }
  }

  async delete(exerciseTypeId: number): Promise<ExerciseType | null> {
    try {
      const exerciseType = await this.prisma.exerciseType.delete({
        where: {
          id: exerciseTypeId,
        },
      });

      if (!exerciseType) throw new InternalServerErrorException('Server error');

      return exerciseType;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete exercise type', error.message);
    }
  }
}
