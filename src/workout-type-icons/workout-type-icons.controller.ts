import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { WorkoutTypeIconsService } from './workout-type-icons.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from '../auth/decorators/auth.decorator';
import { EnumUserRoles } from '@prisma/client';

@Controller('workout-type-icons')
export class WorkoutTypeIconsController {
  constructor(private readonly workoutTypeIconsService: WorkoutTypeIconsService) {}

  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  @Auth(EnumUserRoles.ADMIN)
  @Post('create')
  async create(@UploadedFiles() files: Express.Multer.File[]) {
    return this.workoutTypeIconsService.create(files);
  }

  @HttpCode(200)
  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.workoutTypeIconsService.getById(parseInt(id));
  }

  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  @Auth(EnumUserRoles.ADMIN)
  @Put('update/:iconId')
  async update(@Param('iconId') iconId: number, @UploadedFiles() files: Express.Multer.File[]) {
    return this.workoutTypeIconsService.update(iconId, files);
  }

  @HttpCode(200)
  @Auth(EnumUserRoles.ADMIN)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.workoutTypeIconsService.delete(parseInt(id));
  }
}
