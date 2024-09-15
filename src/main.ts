import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import Config from './config';
import Swagger from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //? Middlewares
  app.use(helmet());

  //? Global Pipes
  app.useGlobalPipes(new ValidationPipe());

  //* SWAGGER
  if (Config.Envs.Dev) {
    const swagger = new Swagger();
    swagger.setup(app);
  }

  //! APP
  await app.listen(Config.Envs.Port);
}

bootstrap();
