import { IsEmail, IsNumber } from 'class-validator';

export class LoginCreateInvitationDto {
  @IsNumber()
  userid: number;

  @IsEmail()
  email: string;
}
