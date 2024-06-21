import { Controller } from '@nestjs/common';
import { RepeatService } from './repeat.service';

@Controller('repeat')
export class RepeatController {
  constructor(private readonly repeatService: RepeatService) {}
}
