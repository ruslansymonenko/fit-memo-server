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
import { ExerciseTypeService } from './exercise-type.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ExerciseTypeDto, ExerciseTypeUpdateDto } from './dto/exercise-type.dto';

@Controller('exercise-type')
export class ExerciseTypeController {
  constructor(private readonly exerciseTypeService: ExerciseTypeService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('create')
  async create(@CurrentUser('id') userId: number, @Body() dto: ExerciseTypeDto) {
    return this.exerciseTypeService.create(userId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.exerciseTypeService.getById(parseInt(id));
  }

  @HttpCode(200)
  @Auth()
  @Get('get-all')
  async getAll(@CurrentUser('id') userId: number) {
    return this.exerciseTypeService.getAll(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() dto: ExerciseTypeUpdateDto) {
    return this.exerciseTypeService.update(parseInt(id), dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.exerciseTypeService.delete(parseInt(id));
  }
}
