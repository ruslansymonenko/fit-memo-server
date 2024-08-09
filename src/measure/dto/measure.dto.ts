import { EnumMeasuresTypes } from '@prisma/client';
import { IsEnum } from 'class-validator';

const measuresArray: string = Object.values(EnumMeasuresTypes).join(', ');

export class MeasureDto {
  @IsEnum(EnumMeasuresTypes, { message: `Should be on of the following type: ${measuresArray}` })
  type: EnumMeasuresTypes;
}
