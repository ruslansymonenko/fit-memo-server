import { Injectable } from '@nestjs/common';

interface IExerciseService {
  create(): void;
  getById(): void;
  update(): void;
  delete(): void;
}

@Injectable()
export class ExerciseService implements IExerciseService {
  create(): void {}
  getById(): void {}
  update(): void {}
  delete(): void {}
}
