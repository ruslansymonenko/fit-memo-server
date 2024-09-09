import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WorkoutTypeService } from './workout-type.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { WorkoutTypeDto, WorkoutUpdateTypeDto } from './dto/workout-type.dto';

@Controller('workout-type')
export class WorkoutTypeController {
  constructor(private readonly workoutTypeService: WorkoutTypeService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('create')
  async create(@CurrentUser('id') userId: number, @Body() dto: WorkoutTypeDto) {
    return this.workoutTypeService.create(userId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.workoutTypeService.getById(parseInt(id));
  }

  @HttpCode(200)
  @Auth()
  @Get('get-all')
  async getAll(@CurrentUser('id') userId: number) {
    return this.workoutTypeService.getAll(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() dto: WorkoutUpdateTypeDto) {
    return this.workoutTypeService.update(parseInt(id), dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.workoutTypeService.delete(parseInt(id));
  }
}
