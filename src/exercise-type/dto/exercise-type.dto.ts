import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class ExerciseTypeDto {
  @IsNotEmpty({
    message: 'Exercise type name is required',
  })
  @IsString({
    message: 'Exercise type name is should be a string',
  })
  name: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Exercise type description is required',
  })
  @IsString({
    message: 'Exercise type name is should be a string',
  })
  description: string;

  @IsOptional()
  @IsBoolean({
    message: 'Is favorite should be boolean type',
  })
  isFavorite: boolean;

  @IsNumber(
    {},
    {
      message: 'Measure Id should be number',
    },
  )
  measureId: number;
}

export class ExerciseTypeUpdateDto {
  @IsOptional()
  @IsNotEmpty({
    message: 'Exercise type name is required',
  })
  @IsString({
    message: 'Exercise type name is should be a string',
  })
  name: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Exercise type description is required',
  })
  @IsString({
    message: 'Exercise type name is should be a string',
  })
  description: string;

  @IsOptional()
  @IsBoolean({
    message: 'Is favorite should be boolean type',
  })
  isFavorite: boolean;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'Measure Id should be number',
    },
  )
  measureId: number;
}
