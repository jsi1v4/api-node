import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApiModule } from './api/api.module';
import apiRoutes from './api/api.routes';
import { AuthModule } from './auth/auth.module';
import Config from './config';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10
      }
    ]),
    ApiModule,
    RouterModule.register([
      {
        path: '/api',
        children: apiRoutes
      }
    ]),
    HttpModule.register({
      timeout: Config.HttpClient.Timeout,
      maxRedirects: Config.HttpClient.MaxRedirects
    }),
    AuthModule
  ]
})
export class AppModule {}
