import { ApiProperty } from '@nestjs/swagger';

export class ListUsersDto {
  @ApiProperty({ required: false })
  name: string;
}
