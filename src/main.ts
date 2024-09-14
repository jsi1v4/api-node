import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import Config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //? Middlewares
  app.use(helmet());

  //* SWAGGER
  if (Config.Envs.Dev) {
    const swagger = new DocumentBuilder()
      .setTitle(Config.App.Title)
      .setDescription(Config.App.Description)
      .setVersion(Config.App.Version)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swagger);

    SwaggerModule.setup('swagger', app, document, {
      jsonDocumentUrl: 'swagger/json'
    });
  }

  //! APP
  await app.listen(Config.Envs.Port);
}

bootstrap();
