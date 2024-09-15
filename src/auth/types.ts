import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiProperty({ description: 'Subject (Codigo do login)' })
  sub: number;

  @ApiProperty({ description: 'Issuer (Emissor do token)' })
  iss: string;

  @ApiProperty({ description: 'E-mail utilizado no login' })
  email: string;

  @ApiProperty({ description: 'Codigo do usuario' })
  userid: number;

  @ApiProperty({ description: 'Nome do usuario' })
  name: string;

  @ApiProperty({ description: 'Url da foto do usuario' })
  photo: string;

  @ApiProperty({ description: 'Acessos do usuario (ex: Admin,User)' })
  roles: string[];

  @ApiProperty({
    description: 'Issued at (Timestamp quando o token foi criado)'
  })
  iat: number;

  @ApiProperty({
    description: 'Expiration (Timestamp quando o token irá expirar)'
  })
  exp: number;

  constructor(value?: Partial<JwtPayload>) {
    Object.assign(this, value);
  }
}

export type WithUser<T> = T & { user: JwtPayload };
