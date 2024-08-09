import { Controller, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('measure')
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  async create() {}
}
