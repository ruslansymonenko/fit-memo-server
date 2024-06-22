import { Injectable } from '@nestjs/common';

interface IMeasureService {
  create(): void;
  getById(): void;
  update(): void;
  delete(): void;
}

@Injectable()
export class MeasureService {
  create(): void {}
  getById(): void {}
  update(): void {}
  delete(): void {}
}
