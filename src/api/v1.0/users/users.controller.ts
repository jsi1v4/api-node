import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '~/auth/roles';
import { ResponseException } from '~/core/exceptions';
import { ListUsersDto } from './dtos/list-users.dto';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * Retorna lista de usuarios
   */
  @Get('/')
  @Roles(Role.Admin, Role.User)
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity, isArray: true })
  async getListUsers(@Query() params?: ListUsersDto) {
    const users = await this.usersService.findUsers(params?.name, params?.page);

    return users;
  }

  /**
   * Retorna um usuario com base no ID informado
   */
  @Get('/:id')
  @Roles(Role.Admin, Role.User)
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ResponseException })
  async getUser(@Param() params: UserDto) {
    const user = await this.usersService.findUser(Number(params.id));

    if (!user)
      throw new ResponseException(
        HttpStatus.BAD_REQUEST,
        'Nenhum usuario encontrado!'
      );

    return user;
  }
}
