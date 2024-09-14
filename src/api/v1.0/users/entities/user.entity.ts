import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number = 0;
  email: string = '';
  name: string = '';
  birthday: Date | null = null;
  photo: string | null = null;
}
