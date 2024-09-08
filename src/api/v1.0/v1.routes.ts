import { Routes } from '@nestjs/core';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    path: '/users',
    module: UsersModule
  }
];

export default routes;
