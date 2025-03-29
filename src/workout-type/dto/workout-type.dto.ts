import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class WorkoutTypeDto {
  @IsString({
    message: 'Workout Type name is required',
  })
  name: string;

  @IsOptional()
  @IsBoolean({ message: 'Value should be a boolean' })
  isFavorite: boolean;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'Workout iconId should be number',
    },
  )
  iconId: number;
}

export class WorkoutUpdateTypeDto {
  @IsOptional()
  @IsString({
    message: 'Workout Type name is required',
  })
  name: string;

  @IsOptional()
  @IsBoolean({ message: 'Value should be a boolean' })
  isFavorite: boolean;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'Workout iconId should be number',
    },
  )
  iconId: number;
}
