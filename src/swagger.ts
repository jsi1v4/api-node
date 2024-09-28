import {
  HttpException as Exception,
  HttpStatus,
  INestApplication
} from '@nestjs/common';
import { ApiProperty, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtPayload } from './auth/types';
import Config from './config';

export default class Swagger {
  constructor() {}

  static setup(app: INestApplication) {
    const swagger = new DocumentBuilder()
      .setTitle(Config.App.Title)
      .setDescription(Config.App.Description)
      .setVersion('v' + Config.App.Version)
      .setContact(
        Config.App.Author.Name,
        Config.App.Author.Url,
        Config.App.Author.Email
      )
      .setLicense(Config.App.License.Name, Config.App.License.Url)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swagger, {
      extraModels: [HttpException, JwtPayload]
    });

    SwaggerModule.setup('swagger', app, document, {
      customSiteTitle: Config.App.Title,
      jsonDocumentUrl: '/swagger/json',
      explorer: false
    });
  }
}

class HttpException extends Exception {
  @ApiProperty()
  readonly statusCode: HttpStatus;
  @ApiProperty()
  readonly message: string;
}
