import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MeasureDto } from './dto/measure.dto';
import { Measure } from '@prisma/client';

interface IMeasureService {
  create(): Promise<Measure | null>;
  getById(): Promise<Measure | null>;
  update(): Promise<Measure | null>;
  delete(): Promise<Measure | null>;
}

@Injectable()
export class MeasureService {
  constructor(private prisma: PrismaService) {}

  async create(dto: MeasureDto): Promise<Measure | null> {
    const measure = await this.prisma.measure.create({
      data: dto,
    });

    if (!measure) throw new InternalServerErrorException('Server error');

    return measure;
  }

  async getById(measureId: number): Promise<Measure | null> {
    const measure = await this.prisma.measure.findUnique({
      where: {
        id: measureId,
      },
    });

    if (!measure) throw new InternalServerErrorException('Server error');

    return measure;
  }

  async update(measureId: number, dto: MeasureDto): Promise<Measure | null> {
    const measure = await this.prisma.measure.update({
      where: {
        id: measureId,
      },
      data: dto,
    });

    if (!measure) throw new InternalServerErrorException('Server error');

    return measure;
  }

  async delete(measureId: number): Promise<Measure | null> {
    const measure = await this.prisma.measure.delete({
      where: {
        id: measureId,
      },
    });

    if (!measure) throw new InternalServerErrorException('Server error');

    return measure;
  }
}
