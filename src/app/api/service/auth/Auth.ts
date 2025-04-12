import { Payload } from "../../lib/_tokenProvider";
import User from "../user/User";

export interface Auth {
  id: User["id"];
  loginid: string;
  loginpw: string;
  created_at: Date;
  updated_at: Date;
}
export interface RegisterRequest {
  loginid: Auth["loginid"];
  loginpw: Auth["loginpw"];
  nickname: User["nickname"];
}

export interface LoginRequest {
  loginid: Auth["loginid"];
  loginpw: Auth["loginpw"];
}

export interface LoginResponse {
  payload: Payload;
}
