import { Key } from "../../lib/supabase/_supabaseClient";
import { LoginId } from "./vo/LoginId";
import { LoginPassword } from "./vo/LoginPassword";

export class Auth {
  id?: Key;
  loginid?: LoginId;
  loginpw?: LoginPassword;
  created_at?: Date;
  updated_at?: Date;

  private constructor(props: AuthProps) {
    this.id = props.id;
    this.loginid = props.loginid;
    this.loginpw = props.loginpw;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static async from(props: AuthFactoryProps): Promise<Auth> {
    const loginid = LoginId.of(props.loginid);
    const loginpw = await LoginPassword.of(props.loginpw);
    return new Auth({ ...props, loginid, loginpw });
  }
}

type AuthProps = {
  id?: Key;
  loginid?: LoginId;
  loginpw?: LoginPassword;
  created_at?: Date;
  updated_at?: Date;
};

type AuthFactoryProps = {
  id?: number;
  loginid?: string;
  loginpw?: string;
  created_at?: Date;
  updated_at?: Date;
};
