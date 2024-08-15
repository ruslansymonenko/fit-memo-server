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
import { WorkoutService } from './workout.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { WorkoutDto, WorkoutUpdateDto } from './dto/workout.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('create')
  async create(@CurrentUser('id') userId: number, @Body() dto: WorkoutDto) {
    return this.workoutService.create(userId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.workoutService.getById(parseInt(id));
  }

  @HttpCode(200)
  @Auth()
  @Get('get-all')
  async getAll(@CurrentUser('id') userId: number) {
    return this.workoutService.getAll(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() dto: WorkoutUpdateDto) {
    return this.workoutService.update(parseInt(id), dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.workoutService.delete(parseInt(id));
  }
}
