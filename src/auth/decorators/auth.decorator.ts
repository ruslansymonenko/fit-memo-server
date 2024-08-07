import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guar';

export const Auth = UseGuards(JwtAuthGuard);
