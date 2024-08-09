import {
  IsDate,
  IsEmpty,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { EnumWorkoutStatus } from '@prisma/client';

export class WorkoutDto {
  @IsEmpty({
    message: 'Name is required',
  })
  @IsString({
    message: 'Name is required',
  })
  name: string;

  @IsOptional()
  @IsDate({
    message: 'Date should be a date',
  })
  date: Date;

  @IsEnum({ EnumWorkoutStatus })
  status: EnumWorkoutStatus;

  @IsInt({
    message: 'Duration must be an integer',
  })
  @Min(0, {
    message: 'Duration must be a non-negative number',
  })
  duration: number;
}
