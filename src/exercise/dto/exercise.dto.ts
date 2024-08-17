import { IsNumber } from 'class-validator';

export class ExerciseDto {
  @IsNumber()
  workoutId: number;

  @IsNumber()
  exerciseTypeId: number;
}
