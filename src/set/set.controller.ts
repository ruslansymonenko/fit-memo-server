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
import { SetService } from './set.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { SetDto } from './dto/set.dto';

@Controller('set')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('create')
  async create(@Body() dto: SetDto) {
    return this.setService.create(dto);
  }

  @HttpCode(200)
  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.setService.getById(parseInt(id));
  }

  @HttpCode(200)
  @Auth()
  @Get('get-by-exercise/:exerciseId')
  async getAll(@Param('exerciseId') exerciseId: string) {
    return this.setService.getByExerciseId(parseInt(exerciseId));
  }

  @HttpCode(200)
  @Auth()
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.setService.delete(parseInt(id));
  }
}
