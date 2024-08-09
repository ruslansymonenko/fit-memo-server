import { IsNumber, IsString } from 'class-validator';

export class UserDataDto {
  @IsNumber({}, { message: 'Height should be a number' })
  height: number;

  @IsNumber({}, { message: 'Weight should be a number' })
  weight: number;

  @IsNumber({}, { message: 'Age should be a number' })
  age: number;

  // @IsString({
  //   message: 'Avatar path is required',
  // })
  // userAvatar: string;
}
