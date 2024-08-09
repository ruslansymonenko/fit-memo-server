import { EnumMeasuresTypes } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class MeasureDto {
  @IsEnum({ EnumMeasuresTypes })
  type: EnumMeasuresTypes;
}
