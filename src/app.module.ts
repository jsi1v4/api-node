import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import Config from './config';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10
      }
    ]),
    HttpModule.register({
      timeout: Config.HttpClient.Timeout,
      maxRedirects: Config.HttpClient.MaxRedirects
    }),
    AuthModule,
    FeaturesModule
  ]
})
export class AppModule {}
