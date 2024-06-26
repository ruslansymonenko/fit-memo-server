import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { hash } from 'argon2';
import { PrismaService } from '../prisma.service';

interface IUserService {
  create(dto: UserDto): Promise<User | null>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: UserDto): Promise<User | null> {
    const isUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (isUser) throw new BadRequestException('User already exists');

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
      },
    });

    if (!user) return null;

    return user;
  }
}
