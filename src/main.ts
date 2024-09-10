import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import Config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //* SWAGGER
  if (Config.Envs.Dev) {
    const swagger = new DocumentBuilder()
      .setTitle(Config.App.Title)
      .setDescription(Config.App.Description)
      .setVersion(Config.App.Version)
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
