import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserDataDto } from './dto/user-data.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('user-data')
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('create')
  async create(@CurrentUser('id') userId: number, @Body() dto: UserDataDto) {
    return this.userDataService.create(userId, dto);
  }

  @Auth()
  @Get('by-user-id')
  async getById(@CurrentUser('id') id: number) {
    const { password, ...user } = await this.userDataService.getByUserId(id);

    return { ...user };
  }

  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  @Auth()
  @Put('update/avatar')
  async updateAvatar(
    @CurrentUser('id') userId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.userDataService.updateAvatar(userId, files);
  }
}
