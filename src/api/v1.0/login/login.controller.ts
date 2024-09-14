import { Body, Controller, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '~/auth/public';
import { Role, Roles } from '~/auth/roles';
import { ResponseException } from '~/core/exceptions';
import { LoginCreateInvitationDto } from './dtos/create-invitation.dto';
import { LoginCreatePasswordDto } from './dtos/create-password.dto';
import { LoginDto } from './dtos/login.dto';
import { LoginEntity } from './entities/login.entity';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller()
export class LoginController {
  constructor(private loginService: LoginService) {}

  /**
   * Realiza login utilizando um usuario e senha
   */
  @Post('/')
  @Public()
  @ApiResponse({ status: HttpStatus.OK, type: LoginEntity })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ResponseException })
  async postLogin(@Body() body?: LoginDto) {
    return this.loginService.doLogin(body.email, body.password);
  }

  /**
   * Cria um convite para login
   */
  @Post('/create-invitation')
  @Roles(Role.Admin)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Number,
    description: 'Codigo do login'
  })
  async postCreateInvitation(@Body() body?: LoginCreateInvitationDto) {
    return this.loginService.createInvitation(
      body.userid,
      body.email,
      body.token
    );
  }

  /**
   * Cria senha para um login
   */
  @Put('/create-password')
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
    type: Number,
    description: 'Codigo do login'
  })
  async putCreatePassword(@Body() body?: LoginCreatePasswordDto) {
    return this.loginService.createPassword(
      body.userid,
      body.password,
      body.invitation
    );
  }
}
