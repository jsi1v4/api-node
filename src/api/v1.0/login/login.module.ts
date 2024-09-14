import { Module } from '@nestjs/common';
import { DatabaseModule } from '~/database/database.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
