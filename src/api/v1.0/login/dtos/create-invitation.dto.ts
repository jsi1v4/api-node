import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class LoginCreateInvitationDto {
  @IsNumber()
  userid: number;

  @IsEmail()
  email: string;

  /** Token de validação de e-mail */
  @IsNotEmpty()
  token: string;
}
