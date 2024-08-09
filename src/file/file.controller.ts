import {
  Controller,
  HttpCode,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { EnumFoldersNames, FileService } from './file.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @HttpCode(200)
  @UseInterceptors(FileInterceptor('files'))
  @Auth()
  @Post('upload')
  async saveFiles(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder: EnumFoldersNames,
    @CurrentUser() userId: number,
  ) {
    return this.fileService.saveFiles(files, folder, userId);
  }
}
