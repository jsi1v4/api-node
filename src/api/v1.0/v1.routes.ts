import { Routes } from '@nestjs/core';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    path: '/login',
    module: LoginModule
  },
  {
    path: '/users',
    module: UsersModule
  }
];

export default routes;
