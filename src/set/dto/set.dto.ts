import { IsNumber } from 'class-validator';

export class SetDto {
  @IsNumber()
  exerciseId: number;
}
