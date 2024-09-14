import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class LoginCreatePasswordDto {
  @IsNumber()
  userid: number;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  invitation: string;
}
