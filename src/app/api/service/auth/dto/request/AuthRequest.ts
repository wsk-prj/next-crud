export class AuthRequest {
  readonly loginid: string;
  readonly loginpw: string;

  private constructor(loginid: string, loginpw: string) {
    this.loginid = loginid;
    this.loginpw = loginpw;
  }

  static from(props: AuthRequestProps): AuthRequest {
    return new AuthRequest(props.loginid, props.loginpw);
  }
}

interface AuthRequestProps {
  loginid: string;
  loginpw: string;
}
