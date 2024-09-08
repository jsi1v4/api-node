import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* SWAGGER
  if (config.env.dev) {
    const swagger = new DocumentBuilder()
      .setTitle(config.app.title)
      .setDescription(config.app.description)
      .setVersion(config.app.version)
      .build();

    const document = SwaggerModule.createDocument(app, swagger);

    SwaggerModule.setup('swagger', app, document, {
      jsonDocumentUrl: 'swagger/json'
    });
  }

  //! APP
  await app.listen(config.env.port);
}

bootstrap();
