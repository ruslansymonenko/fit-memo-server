import { IsNumber, IsOptional } from 'class-validator';

export class RepeatDto {
  @IsOptional()
  @IsNumber({}, { message: 'Quantity should be a number' })
  quantity: number;

  @IsNumber({}, { message: 'Value should be a number' })
  value: number;

  @IsNumber({}, { message: 'Set id should be a number' })
  setId: number;
}

export class RepeatUpdateDto {
  @IsOptional()
  @IsNumber({}, { message: 'Quantity should be a number' })
  quantity: number;

  @IsOptional()
  @IsNumber({}, { message: 'Quantity should be a number' })
  value: number;
}
