import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseException extends HttpException {
  @ApiProperty()
  readonly statusCode: HttpStatus = HttpStatus.BAD_REQUEST;
  @ApiProperty()
  readonly message: string;

  constructor(status: HttpStatus, message: string) {
    super(message, status);

    this.statusCode = status;
    this.message = message;
  }
}
