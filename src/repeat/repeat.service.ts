import { Injectable } from '@nestjs/common';

interface IRepeatService {
  create(): void;
  getById(): void;
  update(): void;
  delete(): void;
}

@Injectable()
export class RepeatService {
  create(): void {}
  getById(): void {}
  update(): void {}
  delete(): void {}
}
