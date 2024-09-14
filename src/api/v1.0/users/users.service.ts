import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '~/database/prisma.service';
import Pagination from '~/utils/pagination';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findUser(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findUsers(name?: string, page?: number): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        name: { contains: name }
      },
      orderBy: { name: 'asc' },
      skip: Pagination.PageToSkip(page, 100),
      take: 100
    });
  }
}
