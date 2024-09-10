import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '~/database/prisma.service';
import { prismaMock } from '~/utils/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const data: User[] = [
  {
    id: 1,
    name: 'John Doe',
    birthday: new Date(),
    photo: ''
  },
  {
    id: 2,
    name: 'Jane Doe',
    birthday: new Date(),
    photo: ''
  }
];

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const users: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaMock('user', data)
        }
      ]
    }).compile();

    usersController = users.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should return Users', async () => {
      const users = await usersController.getListUsers();

      expect(users).toBe(data);
    });
  });
});
