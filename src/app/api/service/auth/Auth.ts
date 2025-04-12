import User from "../user/User";

export interface Auth {
  id: User["id"];
  loginid: string;
  loginpw: string;
  created_at: Date;
  updated_at: Date;
}
