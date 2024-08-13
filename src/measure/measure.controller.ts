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
import { MeasureService } from './measure.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { EnumUserRoles } from '@prisma/client';
import { MeasureDto } from './dto/measure.dto';

@Controller('measure')
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(EnumUserRoles.ADMIN)
  @Post('create')
  async create(@Body() dto: MeasureDto) {
    return this.measureService.create(dto);
  }

  @HttpCode(200)
  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.measureService.getById(parseInt(id));
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth(EnumUserRoles.ADMIN)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() dto: MeasureDto) {
    return this.measureService.update(parseInt(id), dto);
  }

  @HttpCode(200)
  @Auth(EnumUserRoles.ADMIN)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.measureService.delete(parseInt(id));
  }
}
