import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListUsersDto } from './dto/list-users.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @ApiOperation({ tags: ['Users'], summary: 'Retorna lista de usuarios' })
  @ApiResponse({ status: 200, type: UserEntity, isArray: true })
  getListUsers(@Query() params: ListUsersDto) {
    return this.usersService.getUsers({
      name: { contains: params.name }
    });
  }
}
