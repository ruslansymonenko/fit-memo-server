import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { IAuthResponse, ITokens } from '../types/auth.types';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';

interface IAuthService {
  login(dto: AuthDto): void;
  register(dto: AuthDto): Promise<IAuthServiceResponse>;
  getNewTokens(refreshToken: string): void;
  createTokens(userId: number): ITokens;
  addRefreshTokenToResponse(res: Response, refreshToken: string): void;
  removeRefreshTokenFromResponse(res: Response): void;
  validateUser(dto: AuthDto): void;
}

export interface IAuthServiceResponse {
  user: {
    email: string;
    createdAt: Date;
  };
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService implements IAuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private userSevice: UserService,
  ) {}

  login(dto: AuthDto): void {}

  async register(dto: AuthDto): Promise<IAuthServiceResponse> {
    const isUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (isUser) throw new BadRequestException('User already exists');

    const newUser: Partial<User> | null = await this.userSevice.create(dto);

    if (!newUser) throw new BadGatewayException('User was not created, please try later');

    const tokens = this.createTokens(newUser.id);

    return {
      user: {
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
      ...tokens,
    };
  }

  getNewTokens(refreshToken: string): void {}

  createTokens(userId: number): ITokens {
    const data = { id: userId };

    const accessToken: string = this.jwt.sign(data, { expiresIn: '1h' });
    const refreshToken: string = this.jwt.sign(data, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string): void {
    const expiresIn: Date = new Date();

    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      //lax if production
      sameSite: 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response): void {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      //lax if production
      sameSite: 'none',
    });
  }

  validateUser(dto: AuthDto): void {}
}
