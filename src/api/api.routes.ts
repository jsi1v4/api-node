import { Routes } from '@nestjs/core';
import v1Routes from './v1.0/v1.routes';

const routes: Routes = [
  {
    path: '/v1.0',
    children: v1Routes
  }
];

export default routes;
