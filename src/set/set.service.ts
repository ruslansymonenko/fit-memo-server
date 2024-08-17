import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Set } from '@prisma/client';
import { SetDto } from './dto/set.dto';

interface ISetService {
  create(dto: SetDto): Promise<Set | null>;
  getById(setId: number): Promise<Set | null>;
  getByExerciseId(exerciseId: number): Promise<Set[] | null>;
  delete(setId: number): Promise<Set | null>;
}

@Injectable()
export class SetService implements ISetService {
  constructor(private prisma: PrismaService) {}

  async create(dto: SetDto): Promise<Set | null> {
    try {
      const set = await this.prisma.set.create({
        data: {
          exercise: { connect: { id: dto.exerciseId } },
        },
      });

      if (!set) throw new InternalServerErrorException('Server error while creating set');

      return set;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create set', error.message);
    }
  }

  async getById(setId: number): Promise<Set | null> {
    try {
      const set = await this.prisma.set.findUnique({
        where: {
          id: setId,
        },
      });

      if (!set) throw new NotFoundException('Set not found');

      return set;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get set', error.message);
    }
  }

  async getByExerciseId(setId: number): Promise<Set[] | null> {
    try {
      const set = await this.prisma.set.findMany({
        where: {
          exerciseId: setId,
        },
      });

      if (!set) throw new NotFoundException('Server error');

      return set;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get set', error.message);
    }
  }

  async delete(setId: number): Promise<Set | null> {
    try {
      const set = await this.prisma.set.delete({
        where: {
          id: setId,
        },
      });

      if (!set) throw new InternalServerErrorException('Server error');

      return set;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete set', error.message);
    }
  }
}
