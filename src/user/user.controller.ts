import { Controller, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
