import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '~/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getUser(where?: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where });
  }

  getUsers(
    where?: Prisma.UserWhereInput,
    skip?: number,
    take?: number
  ): Promise<User[]> {
    return this.prisma.user.findMany({
      where,
      orderBy: { name: 'asc' },
      skip: skip || 0,
      take: take || 100
    });
  }
}
