import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { ExerciseDto } from './dto/exercise.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('create')
  async create(@Body() dto: ExerciseDto) {
    return this.exerciseService.create(dto);
  }

  @HttpCode(200)
  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.exerciseService.getById(parseInt(id));
  }

  @HttpCode(200)
  @Auth()
  @Get('get-by-workout/:workoutId')
  async getAll(@Param('workoutId') workoutId: string) {
    return this.exerciseService.getByWorkoutId(parseInt(workoutId));
  }

  @HttpCode(200)
  @Auth()
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.exerciseService.delete(parseInt(id));
  }
}
