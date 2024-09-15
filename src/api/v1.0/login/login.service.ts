import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { JwtPayload } from '~/auth/types';
import Config from '~/config';
import { PrismaService } from '~/database/prisma.service';
import { LoginEntity } from './entities/login.entity';

@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async doLogin(email: string, password: string, issuer: string) {
    const hash = createHash('sha256').update(password).digest('hex');

    const login = await this.prisma.login.findUnique({
      where: { email, password: hash }
    });

    if (!login) {
      throw new UnauthorizedException('Login invalido!');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: login.userid }
    });

    if (!user) {
      throw new UnauthorizedException('Usuario não encontrado!');
    }

    const roles = await this.prisma.loginRoles.findMany({
      where: { loginid: login.id },
      select: { role: true }
    });

    const payload = new JwtPayload({
      sub: login.id,
      iss: issuer,
      email: login.email,
      userid: user.id,
      name: user.name,
      photo: user.photo,
      roles: roles.map((x) => x.role.description)
    });

    const token = await this.jwt.signAsync({ ...payload });

    const expires = Config.Auth.ExpiresIn;

    const result = new LoginEntity({
      id: login.id,
      accessToken: token,
      expires: expires
    });

    return result;
  }

  async checkToken(token: string) {
    const payload = await this.jwt.verifyAsync(token);
    return new JwtPayload(payload);
  }

  async createInvitation(userid: number, email: string) {
    const hash = createHash('sha256').digest('hex');

    const login = await this.prisma.login.create({
      data: { userid, email, invitation: hash }
    });

    if (!login) {
      throw new BadRequestException(
        'Nao foi possivel criar o login para o e-mail informado!'
      );
    }

    return login.id;
  }

  async createPassword(userid: number, password: string, invitation: string) {
    const inv = await this.prisma.login.findUnique({
      where: { id: userid, invitation }
    });

    if (!inv) {
      throw new BadRequestException(
        'Nenhum convite encontrado para este e-mail!'
      );
    }

    const hash = createHash('sha256').update(password).digest('hex');

    const login = await this.prisma.login.update({
      data: { password: hash, invitation: null },
      where: { id: inv.id }
    });

    return login.id;
  }
}
