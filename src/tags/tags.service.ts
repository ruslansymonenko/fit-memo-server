import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Tags } from '@prisma/client';
import { TagsDto, TagsUpdateDto } from './dto/tags.dto';

interface ITagsService {
  create(userId: number, dto: TagsDto): Promise<Tags | null>;
  getById(tagId: number): Promise<Tags | null>;
  getAll(userId: number): Promise<Tags[] | null>;
  update(tagId: number, dto: TagsUpdateDto): Promise<Tags | null>;
  delete(tagId: number): Promise<Tags | null>;
}

enum EnumTagsColors {
  DEFAULT = '#0284c7',
}

@Injectable()
export class TagsService implements ITagsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: TagsDto): Promise<Tags | null> {
    try {
      const tagColor = dto.color ? dto.color : EnumTagsColors.DEFAULT;

      const tag = await this.prisma.tags.create({
        data: {
          name: dto.name,
          color: tagColor,
          user: {
            connect: { id: userId },
          },
        },
        include: {
          workouts: true,
        },
      });

      if (!tag) throw new InternalServerErrorException('Server error');

      return tag;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create tag', error.message);
    }
  }

  async getById(tagId: number): Promise<Tags | null> {
    try {
      const tag = await this.prisma.tags.findUnique({
        where: {
          id: tagId,
        },
        include: {
          workouts: true,
        },
      });

      if (!tag) throw new InternalServerErrorException('Tag was not found');

      return tag;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get tag', error.message);
    }
  }

  async getAll(userId: number): Promise<Tags[] | null> {
    try {
      const tags = await this.prisma.tags.findMany({
        where: {
          userId: userId,
        },
        include: {
          workouts: true,
        },
      });

      if (!tags) throw new InternalServerErrorException('Tags was not found');

      return tags;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get tags', error.message);
    }
  }

  async update(tagId: number, dto: TagsUpdateDto): Promise<Tags | null> {
    try {
      const currentTag = await this.getById(tagId);

      if (!currentTag) {
        throw new NotFoundException('Tag not found');
      }

      const updateData: Prisma.TagsUpdateInput = {};

      if (dto.name !== undefined) {
        updateData.name = dto.name;
      }

      if (dto.color !== undefined) {
        updateData.color = dto.color;
      }

      if (Object.keys(updateData).length === 0) {
        return currentTag;
      }

      const tag = await this.prisma.tags.update({
        where: {
          id: tagId,
        },
        data: updateData,
      });

      if (!tag) throw new InternalServerErrorException('Server error');

      return tag;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update tag', error.message);
    }
  }

  async delete(tagId: number): Promise<Tags | null> {
    try {
      const tag = await this.prisma.tags.delete({
        where: {
          id: tagId,
        },
      });

      if (!tag) throw new InternalServerErrorException('Server error');

      return tag;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get tags', error.message);
    }
  }
}
