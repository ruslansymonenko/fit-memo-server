import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RepeatDto, RepeatUpdateDto } from './dto/repeat.dto';
import { PrismaService } from '../prisma.service';

interface IRepeatService {
  create(dto: RepeatDto): Promise<RepeatDto | null>;
  getById(repeatId: number): Promise<RepeatDto | null>;
  getBySetId(setId: number): Promise<RepeatDto[] | null>;
  update(repeatId: number, dto: RepeatUpdateDto): Promise<RepeatDto | null>;
  delete(repeatId: number): Promise<RepeatDto | null>;
}

@Injectable()
export class RepeatService implements IRepeatService {
  constructor(private prisma: PrismaService) {}

  async create(dto: RepeatDto): Promise<RepeatDto | null> {
    try {
      const repeat = await this.prisma.repeat.create({
        data: {
          quantity: dto.quantity ? dto.quantity : null,
          value: dto.value,
          set: { connect: { id: dto.setId } },
        },
      });

      if (!repeat) throw new InternalServerErrorException('Server error while creating repeat');

      return repeat;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create repeat', error.message);
    }
  }

  async getById(repeatId: number): Promise<RepeatDto | null> {
    try {
      const repeat = await this.prisma.repeat.findUnique({
        where: {
          id: repeatId,
        },
      });

      if (!repeat) throw new InternalServerErrorException('Repeat type not found');

      return repeat;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get repeat', error.message);
    }
  }

  async getBySetId(setId: number): Promise<RepeatDto[] | null> {
    try {
      const repeat = await this.prisma.repeat.findMany({
        where: {
          setId: setId,
        },
      });

      if (!repeat) throw new InternalServerErrorException('Server error');

      return repeat;
    } catch (error) {
      throw new InternalServerErrorException('Failed to repeat', error.message);
    }
  }

  async update(repeatId: number, dto: RepeatUpdateDto): Promise<RepeatDto | null> {
    try {
      const currentRepeat = await this.getById(repeatId);

      if (!currentRepeat) {
        throw new NotFoundException('Exercise type not found');
      }

      const updateData: Prisma.RepeatUpdateInput = {};

      if (dto.quantity !== undefined) {
        updateData.quantity = dto.quantity;
      }

      if (dto.value !== undefined) {
        updateData.value = dto.value;
      }

      if (Object.keys(updateData).length === 0) {
        return currentRepeat;
      }

      const repeat = await this.prisma.repeat.update({
        where: {
          id: repeatId,
        },
        data: updateData,
      });

      if (!repeat) throw new InternalServerErrorException('Server error');

      return repeat;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update repeat', error.message);
    }
  }

  async delete(repeatId: number): Promise<RepeatDto | null> {
    try {
      const repeat = await this.prisma.repeat.delete({
        where: {
          id: repeatId,
        },
      });

      if (!repeat) throw new InternalServerErrorException('Server error');

      return repeat;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete exercise type', error.message);
    }
  }
}
