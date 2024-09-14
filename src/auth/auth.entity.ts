export class JwtPayload {
  sub: number;
  email: string;
  userid: number;
  name: string;
  photo: string;
  roles: string[];
  iat: number;
  exp: number;
}
