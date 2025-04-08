import User from "../user/User";

export interface Auth {
  id: User["id"];
  loginid: string;
  loginpw: string;
  createdAt: Date;
  updatedAt: Date;
}
