import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';

interface IAuthService {
  login(dto: AuthDto): void;
  register(dto: AuthDto): void;
  getNewTokens(refreshToken: string): void;
  createTokens(userId: string): void;
  addRefreshTokenToResponse(res: Response, refreshToken: string): void;
  removeRefreshTokenFromResponse(res: Response): void;
  validateUser(dto: AuthDto): void;
}

@Injectable()
export class AuthService implements IAuthService {
  login(dto: AuthDto): void {}

  register(dto: AuthDto): void {}

  getNewTokens(refreshToken: string): void {}

  createTokens(userId: string): void {}

  addRefreshTokenToResponse(res: Response, refreshToken: string): void {}

  removeRefreshTokenFromResponse(res: Response): void {}

  validateUser(dto: AuthDto): void {}
}
