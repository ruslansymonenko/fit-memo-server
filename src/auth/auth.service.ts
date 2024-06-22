import { Injectable } from '@nestjs/common';

interface IAuthService {
  login(): void;
  register(): void;
  refreshTokens(): void;
  createTokens(): void;
  addRefreshTokenToResponse(): void;
  removeRefreshTokenFromResponse(): void;
  validateUser(): void;
}

@Injectable()
export class AuthService implements IAuthService {
  login(): void {}

  register(): void {}

  refreshTokens(): void {}

  createTokens(): void {}

  addRefreshTokenToResponse(): void {}

  removeRefreshTokenFromResponse(): void {}

  validateUser(): void {}
}
