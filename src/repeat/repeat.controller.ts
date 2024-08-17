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
import { RepeatService } from './repeat.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ExerciseTypeDto, ExerciseTypeUpdateDto } from '../exercise-type/dto/exercise-type.dto';
import { RepeatDto, RepeatUpdateDto } from './dto/repeat.dto';

@Controller('repeat')
export class RepeatController {
  constructor(private readonly repeatService: RepeatService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('create')
  async create(@Body() dto: RepeatDto) {
    return this.repeatService.create(dto);
  }

  @HttpCode(200)
  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.repeatService.getById(parseInt(id));
  }

  @HttpCode(200)
  @Auth()
  @Get('get-by-set')
  async getAll(@Param('setId') setId: string) {
    return this.repeatService.getBySetId(parseInt(setId));
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() dto: RepeatUpdateDto) {
    return this.repeatService.update(parseInt(id), dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.repeatService.delete(parseInt(id));
  }
}
