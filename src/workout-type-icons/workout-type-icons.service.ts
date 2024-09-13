import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { WorkoutTypeIcons } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { EnumFoldersNames, FileService } from '../file/file.service';

interface IWorkoutTypeIcons {
  create(file: Express.Multer.File[]): Promise<WorkoutTypeIcons | null>;
  getById(iconId: number): Promise<WorkoutTypeIcons | null>;
  getAll(): Promise<WorkoutTypeIcons[] | null>;
  update(iconId: number, file: Express.Multer.File[]): Promise<WorkoutTypeIcons | null>;
  delete(iconId: number): Promise<WorkoutTypeIcons | null>;
}

@Injectable()
export class WorkoutTypeIconsService implements IWorkoutTypeIcons {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async create(file: Express.Multer.File[]): Promise<WorkoutTypeIcons | null> {
    try {
      if (!file) throw new BadRequestException('File not found');

      const fileData = await this.fileService.saveFiles(file, EnumFoldersNames.WORKOUT_ICONS);
      const iconPath = fileData[0].url;

      const newIcon = await this.prisma.workoutTypeIcons.create({
        data: {
          icon: iconPath,
        },
      });

      if (!newIcon) throw new InternalServerErrorException('Server error');

      return newIcon;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }

  async getAll(): Promise<WorkoutTypeIcons[] | null> {
    try {
      const workoutTypeIcons = await this.prisma.workoutTypeIcons.findMany();

      if (!workoutTypeIcons) throw new InternalServerErrorException('Server error');

      return workoutTypeIcons;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get Workout Types', error.message);
    }
  }

  async getById(iconId: number): Promise<WorkoutTypeIcons | null> {
    try {
      const icon = await this.prisma.workoutTypeIcons.findUnique({
        where: {
          id: iconId,
        },
      });

      if (!icon) throw new InternalServerErrorException('Server error');

      return icon;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }

  async update(iconId: number, file: Express.Multer.File[]): Promise<WorkoutTypeIcons | null> {
    try {
      const fileData = await this.fileService.saveFiles(file, EnumFoldersNames.WORKOUT_ICONS);
      const iconPath = fileData[0].url;

      const newIcon = await this.prisma.workoutTypeIcons.update({
        where: {
          id: iconId,
        },
        data: {
          icon: iconPath,
        },
      });

      if (!newIcon) throw new InternalServerErrorException('Server error');

      return newIcon;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }

  async delete(iconId: number): Promise<WorkoutTypeIcons | null> {
    try {
      const icon = await this.prisma.workoutTypeIcons.delete({
        where: {
          id: iconId,
        },
      });

      if (!icon) throw new InternalServerErrorException('Server error');

      return icon;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }
}
