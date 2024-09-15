export class JwtPayload {
  sub: number;
  email: string;
  userid: number;
  name: string;
  photo: string;
  roles: string[];
  iat: number;
  exp: number;

  constructor(value?: Partial<JwtPayload>) {
    Object.assign(this, value);
  }
}

export type WithUser<T> = T & { user: JwtPayload };
