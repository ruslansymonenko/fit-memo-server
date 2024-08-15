import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User, UserData } from '@prisma/client';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';
import { UserDataDto } from './dto/user-data.dto';
import { EnumFoldersNames, FileService } from '../file/file.service';

interface IUserDataService {
  create(userId: number, dto: UserDataDto): Promise<UserData | null>;
  getById(id: number): Promise<UserData | null>;
  getByUserId(userID: number): Promise<(User & { data: UserData | null }) | null>;
  update(userDataId: number, dto: UserDataDto): Promise<IUserDataReturnInfo | null>;
  updateAvatar(userId: number, file: Express.Multer.File[]): Promise<UserData | null>;
  delete(userId: number): Promise<UserData | null>;
}

export interface IUserDataReturnInfo {}

@Injectable()
export class UserDataService implements IUserDataService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private fileService: FileService,
  ) {}

  async create(userId: number, dto: UserDataDto): Promise<UserData | null> {
    try {
      const user = await this.userService.findById(userId);

      if (!user) throw new BadRequestException('User not found');

      const isUserDataExist = await this.getByUserId(user.id);

      if (isUserDataExist.data) throw new BadRequestException('User data already exist');

      const userData = await this.prisma.userData.create({
        data: {
          height: dto.height,
          weight: dto.weight,
          age: dto.age,
          userId: user.id,
        },
      });

      if (!userData) throw new NotFoundException('Server error');

      return userData;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }

  async getById(id: number): Promise<UserData | null> {
    try {
      const userData = await this.prisma.userData.findUnique({
        where: {
          id: id,
        },
      });

      if (!userData) throw new NotFoundException('User data not found');

      return userData;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }

  async getByUserId(userId: number): Promise<(User & { data: UserData | null }) | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          data: true,
        },
      });

      if (!user) throw new NotFoundException('User data not found');

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }

  async update(userId: number, dto: UserDataDto): Promise<UserData | null> {
    try {
      const user = await this.userService.findById(userId);

      if (!user) throw new BadRequestException('User not found');

      const userData = await this.prisma.userData.update({
        where: {
          id: userId,
        },
        data: dto,
      });

      if (!userData) throw new NotFoundException('Server error');

      return userData;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }

  async updateAvatar(userId: number, file: Express.Multer.File[]): Promise<UserData | null> {
    try {
      const userInfo: User & { data: UserData | null } = await this.getByUserId(userId);
      const userData = userInfo?.data;

      if (!userData) throw new BadRequestException('User data not found');

      const fileData = await this.fileService.saveFiles(file, EnumFoldersNames.AVATARS, userId);
      const avatarPath = fileData[0].url;

      const updatedUserData = await this.prisma.userData.update({
        where: {
          id: userData.id,
        },
        data: {
          userAvatar: avatarPath,
        },
      });

      if (!userData) throw new NotFoundException('Server error');

      return userData;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }

  async delete(userId: number) {
    try {
      const userInfo: User & { data: UserData | null } = await this.getByUserId(userId);
      const userData = userInfo?.data;

      if (!userData) throw new BadRequestException('User data not found');

      return this.prisma.userData.delete({
        where: {
          id: userData.id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create WorkoutType', error.message);
    }
  }
}
