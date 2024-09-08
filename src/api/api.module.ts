import { Module } from '@nestjs/common';
import { V1Module } from './v1.0/v1.module';

@Module({
  imports: [V1Module]
})
export class ApiModule {}
