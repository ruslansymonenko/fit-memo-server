import { Module } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { UserDataController } from './user-data.controller';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [UserDataController],
  providers: [UserDataService, PrismaService, UserService, FileService],
})
export class UserDataModule {}
