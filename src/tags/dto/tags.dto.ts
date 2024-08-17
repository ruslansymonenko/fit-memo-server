import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TagsDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name should be a string' })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Color is required' })
  @IsString({ message: 'Color should be a string' })
  color: string;
}

export class TagsUpdateDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name should be a string' })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Color is required' })
  @IsString({ message: 'Color should be a string' })
  color: string;

  @IsOptional()
  @IsBoolean({
    message: 'Is favorite should be boolean type',
  })
  isFavorite: boolean;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'Workout id should be boolean type',
    },
  )
  workoutId: number;
}
