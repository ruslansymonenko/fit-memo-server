import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserData } from '@prisma/client';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';
import { UserDataDto } from './dto/user-data.dto';
import { EnumFoldersNames, FileService } from '../file/file.service';

interface IUserDataService {
  create(userId: number, dto: UserDataDto): Promise<UserData | null>;
  getById(id: number): Promise<UserData | null>;
  // getByUserId(userID: number): Promise<UserData | null>;
  update(userDataId: number, dto: UserDataDto): Promise<IUserDataReturnInfo | null>;
  // delete(userDataId: number): Promise<UserData | null>;
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
    const user = await this.userService.findById(userId);

    if (!user) throw new BadRequestException('User not found');

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
  }

  async update(userId: number, dto: UserDataDto): Promise<UserData | null> {
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
  }

  async getById(id: number): Promise<UserData | null> {
    const userData = await this.prisma.userData.findUnique({
      where: {
        id: id,
      },
    });

    if (!userData) throw new NotFoundException('User data not found');

    return userData;
  }

  async updateAvatar(
    userDataId: number,
    userId: number,
    file: Express.Multer.File[],
  ): Promise<UserData | null> {
    const userData = await this.getById(userDataId);

    if (!userData) throw new BadRequestException('User data not found');

    const fileData = await this.fileService.saveFiles(file, EnumFoldersNames.AVATARS, userId);
    const avatarPath = fileData[0].url;
    console.log(avatarPath);

    const updatedUserData = await this.prisma.userData.update({
      where: {
        id: userDataId,
      },
      data: {
        userAvatar: avatarPath,
      },
    });

    if (!userData) throw new NotFoundException('Server error');

    return userData;
  }
}
