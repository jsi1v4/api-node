import { Body, Controller, Post, Put, Request as Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '~/auth/public';
import { Role, Roles } from '~/auth/roles';
import { LoginCreateInvitationDto } from './dtos/create-invitation.dto';
import { LoginCreatePasswordDto } from './dtos/create-password.dto';
import { LoginDto } from './dtos/login.dto';
import { LoginEntity } from './entities/login.entity';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller('/v1/login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  /**
   * Realiza login utilizando um usuario e senha
   */
  @Post('/')
  @Public()
  @ApiOkResponse({ type: LoginEntity })
  async postLogin(@Req() req: Request, @Body() body: LoginDto) {
    return this.loginService.doLogin(
      body.email,
      body.password,
      `${req.protocol}://${req.hostname}`
    );
  }

  /**
   * Cria um convite para login
   */
  @Post('/create-invitation')
  @Roles(Role.Admin)
  @ApiOkResponse({
    type: Number,
    description: 'Codigo do login'
  })
  async postCreateInvitation(@Body() body: LoginCreateInvitationDto) {
    return this.loginService.createInvitation(body.userid, body.email);
  }

  /**
   * Cria senha para um login
   */
  @Put('/create-password')
  @Public()
  @ApiOkResponse({
    type: Number,
    description: 'Codigo do login'
  })
  async putCreatePassword(@Body() body: LoginCreatePasswordDto) {
    return this.loginService.createPassword(
      body.userid,
      body.password,
      body.invitation
    );
  }
}
