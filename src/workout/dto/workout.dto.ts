import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { EnumWorkoutStatus } from '@prisma/client';

const workoutStatuses: string = Object.values(EnumWorkoutStatus).join(', ');

export class WorkoutDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString({
    message: 'Name is required',
  })
  name: string;

  @IsOptional()
  @IsBoolean({ message: 'Value should be a boolean' })
  isFavorite: boolean;

  @IsOptional()
  @IsDate({
    message: 'Date should be a date',
  })
  date: Date;

  @IsEnum(EnumWorkoutStatus, {
    message: `Status should be one of: ${workoutStatuses}`,
  })
  status: EnumWorkoutStatus;

  @IsInt({
    message: 'Duration must be an integer',
  })
  @Min(0, {
    message: 'Duration must be a non-negative number',
  })
  duration: number;

  @IsNumber({}, { message: 'Workout type id should be a number' })
  workoutTypeId: number;
}

export class WorkoutUpdateDto {
  @IsOptional()
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString({
    message: 'Name is required',
  })
  name: string;

  @IsOptional()
  @IsBoolean({ message: 'Value should be a boolean' })
  isFavorite: boolean;

  @IsOptional()
  @IsDate({
    message: 'Date should be a date',
  })
  date: Date;

  @IsOptional()
  @IsEnum(EnumWorkoutStatus, {
    message: `Status should be one of: ${workoutStatuses}`,
  })
  status: EnumWorkoutStatus;

  @IsOptional()
  @IsInt({
    message: 'Duration must be an integer',
  })
  @Min(0, {
    message: 'Duration must be a non-negative number',
  })
  duration: number;

  @IsOptional()
  @IsNumber({}, { message: 'Workout type id should be a number' })
  workoutTypeId: number;

  @IsOptional()
  @IsArray({})
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  tagIds: number[];
}
