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
import { TagsService } from './tags.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { TagsDto, TagsUpdateDto } from './dto/tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('create')
  async create(@CurrentUser('id') userId: number, @Body() dto: TagsDto) {
    return this.tagsService.create(userId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.tagsService.getById(parseInt(id));
  }

  @HttpCode(200)
  @Auth()
  @Get('get-all')
  async getAll(@CurrentUser('id') userId: number) {
    return this.tagsService.getAll(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() dto: TagsUpdateDto) {
    return this.tagsService.update(parseInt(id), dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.tagsService.delete(parseInt(id));
  }
}
