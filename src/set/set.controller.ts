import { Controller } from '@nestjs/common';
import { SetService } from './set.service';

@Controller('set')
export class SetController {
  constructor(private readonly setService: SetService) {}
}
