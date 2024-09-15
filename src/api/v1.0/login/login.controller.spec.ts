import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Login, LoginRoles, Roles, User } from '@prisma/client';
import { AuthModule } from '~/auth/auth.module';
import { PrismaService } from '~/database/prisma.service';
import Testing from '~/utils/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    birthday: new Date(),
    photo: ''
  }
];

const login: Login[] = [
  {
    id: 1,
    email: 'john@test.com',
    userid: 1,
    invitation: '',
    password: '937e8d5fbb48bd4949536cd65b8d35c426b80d2f830c5c308e2cdec422ae2244'
  }
];

const roles: Roles[] = [
  {
    id: 1,
    description: 'Admin'
  },
  {
    id: 2,
    description: 'User'
  }
];

const loginRoles: (LoginRoles & { role: Roles })[] = [
  {
    id: 1,
    loginid: 1,
    roleid: 1,
    role: roles[0]
  },
  {
    id: 2,
    loginid: 1,
    roleid: 2,
    role: roles[1]
  }
];

describe('LoginController', () => {
  let controller: LoginController;
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [LoginController],
      providers: [
        LoginService,
        {
          provide: PrismaService,
          useValue: Testing.PrismaMocks({
            user: users,
            login,
            roles,
            loginRoles
          })
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn().mockResolvedValue({
              sub: login[0].id,
              email: login[0].email,
              userid: login[0].userid,
              name: users[0].name,
              photo: users[0].photo,
              roles: roles.map((x) => x.description)
            }),
            signAsync: jest
              .fn()
              .mockResolvedValue(
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJpZCI6MiwibmFtZSI6IkpvaG4gRG9lIiwicGhvdG8iOiIiLCJyb2xlcyI6WyJVc2VyIl0sImlhdCI6MTcyNjQxMjcyMywiZXhwIjoxNzI2NDE2MzIzfQ.4UVEL4gRtuaZSdcEFdwMZNriyfcplsKOzPnyTG5Voao'
              )
          }
        }
      ]
    }).compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);
  });

  it('should return access token', async () => {
    const login = await controller.postLogin({
      email: 'test@test.com',
      password: 'test1234'
    });

    const payload = await service.checkToken(login.accessToken);

    expect(payload.sub).toBe(login.id);
  });
});
