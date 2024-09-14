export class LoginEntity {
  id: number;
  /** Token para utilizar no Authorization */
  accessToken: string;
  /** Segundos ate o token expirar */
  expires: number;
}
