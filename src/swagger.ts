import {
  HttpException as Exception,
  HttpStatus,
  INestApplication
} from '@nestjs/common';
import { ApiProperty, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtPayload } from './auth/types';
import Config from './config';

export default class Swagger {
  setup(app: INestApplication) {
    const swagger = new DocumentBuilder()
      .setTitle(Config.App.Title)
      .setDescription(Config.App.Description)
      .setVersion(Config.App.Version)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swagger, {
      extraModels: [HttpException, JwtPayload]
    });

    SwaggerModule.setup('swagger', app, document, {
      jsonDocumentUrl: 'swagger/json'
    });
  }
}

class HttpException extends Exception {
  @ApiProperty()
  readonly statusCode: HttpStatus;
  @ApiProperty()
  readonly message: string;
}
