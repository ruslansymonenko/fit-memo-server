import {
  Body,
  Controller,
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

  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  @Auth()
  @Put('update/avatar/:userDataId')
  async updateAvatar(
    @CurrentUser('id') userId: number,
    @Param('userDataId') userDataId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.userDataService.updateAvatar(parseInt(userDataId), userId, files);
  }
}
