import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseException } from '~/core/exceptions';
import Pagination from '~/utils/pagination';
import { ListUsersDto } from './dto/list-users.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @ApiOperation({ tags: ['Users'], summary: 'Retorna lista de usuarios' })
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity, isArray: true })
  async getListUsers(@Query() params?: ListUsersDto) {
    return this.usersService.getUsers(
      {
        name: { contains: params?.name }
      },
      Pagination.PageToSkip(params?.page, 100),
      100
    );
  }

  @Get('/:id')
  @ApiOperation({
    tags: ['Users'],
    summary: 'Retorna um usuario com base no ID informado'
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ResponseException })
  async getUser(@Param() params: UserDto) {
    const user = await this.usersService.getUser({
      id: Number(params.id)
    });

    if (!user)
      throw new ResponseException(
        HttpStatus.BAD_REQUEST,
        'Nenhum usuario encontrado!'
      );

    return user;
  }
}
