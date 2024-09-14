import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { JwtPayload } from '~/auth/auth.entity';
import Config from '~/config';
import { PrismaService } from '~/database/prisma.service';
import { LoginEntity } from './entities/login.entity';

@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async doLogin(email: string, password: string) {
    const hash = createHash('sha256').update(password).digest('hex');

    const login = await this.prisma.login.findUnique({
      where: { email, password: hash }
    });

    if (!login) {
      throw new UnauthorizedException();
    }

    const user = await this.prisma.user.findUnique({
      where: { id: login.userid }
    });

    if (!user) {
      throw new Error('Usuario não encontrado!');
    }

    const roles = await this.prisma.loginRoles.findMany({
      where: { loginid: login.id },
      select: { role: true }
    });

    const payload = new JwtPayload();

    payload.sub = login.id;
    payload.email = login.email;
    payload.userid = user.id;
    payload.name = user.name;
    payload.photo = user.photo;
    payload.roles = roles.map((x) => x.role.description);

    const token = await this.jwt.signAsync({ ...payload });

    const expires = Config.Auth.ExpiresIn;

    const result = new LoginEntity();

    result.id = login.id;
    result.accessToken = token;
    result.expires = expires;

    return result;
  }

  async createInvitation(userid: number, email: string, token: string) {
    if (token) {
      throw new Error('Token de validação de e-mail invalido!');
    }

    const login = await this.prisma.login.create({
      data: { userid, email }
    });

    if (!login) {
      throw new Error('Nao foi possivel criar o login');
    }

    return login.id;
  }

  async createPassword(userid: number, password: string, invitation: string) {
    const inv = await this.prisma.login.findUnique({
      where: { id: userid, invitation }
    });

    if (!inv) {
      throw new Error('Nenhum convite encontrado para este e-mail!');
    }

    const hash = createHash('sha256').update(password).digest('hex');

    const login = await this.prisma.login.update({
      data: { password: hash, invitation: null },
      where: { id: inv.id }
    });

    return login.id;
  }
}
