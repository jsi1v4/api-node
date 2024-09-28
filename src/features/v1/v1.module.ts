import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [LoginModule, UsersModule]
})
export class V1Module {}
