import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '~/auth/roles';
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
  @Roles(Role.Admin)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getListUsers(@Query() params?: ListUsersDto) {
    const users = await this.usersService.findUsers(params?.name, params?.page);

    return users;
  }

  /**
   * Retorna um usuario com base no ID informado
   */
  @Get('/:id')
  @Roles(Role.Admin)
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Param() params: UserDto) {
    const user = await this.usersService.findUser(Number(params.id));

    if (!user) throw new BadRequestException('Nenhum usuario encontrado!');

    return user;
  }
}
