import { ApiProperty } from '@nestjs/swagger';

export class ListUsersDto {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({
    required: false,
    description: 'Utilizar para paginação do resultado (top 100)'
  })
  page: number;
}
