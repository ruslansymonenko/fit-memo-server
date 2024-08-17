import { ArrayNotEmpty, IsArray, IsNumber, IsOptional } from 'class-validator';

export class AddTagsDto {
  @IsOptional()
  @IsArray({})
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  tagIds: number[];
}
