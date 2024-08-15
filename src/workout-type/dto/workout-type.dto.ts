import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class WorkoutTypeDto {
  @IsString({
    message: 'Workout Type name is required',
  })
  name: string;

  @IsOptional()
  @IsBoolean({ message: 'Value should be a boolean' })
  isFavorite: boolean;

  @IsOptional()
  @IsString({
    message: 'Workout icon path should be a string',
  })
  iconId: number;
}
