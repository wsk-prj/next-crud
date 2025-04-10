import { Payload } from "@/lib/tokenProvider";
import TokenProvider from "@/lib/tokenProvider";
import bcrypt from "bcrypt";
import { findUserById } from "../user/_userRepository";
import { Auth } from "./Auth";
import { findAuthById } from "./_authRepository";

export interface LoginRequest {
  loginid: Auth["loginid"];
  loginpw: Auth["loginpw"];
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  payload: Payload;
}

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  // 사용자가 입력한 id가 존재하는지 확인
  const auth = await findAuthById(request.loginid);

  if (auth == null) {
    throw new Error("로그인 정보가 잘못되었습니다.");
  }

  // 사용자가 입력한 비밀번호와 해싱된 비밀번호가 일치하는지 확인
  const isPasswordEquals = await bcrypt.compare(request.loginpw, auth.loginpw);
  if (!isPasswordEquals) {
    throw new Error("로그인 정보가 잘못되었습니다.");
  }

  // JWT 토큰 발급
  const user = await findUserById(auth.id);

  if (user == null) {
    throw new Error("회원 정보가 존재하지 않습니다.");
  }

  const payload = {
    sub: String(user.id),
    nickname: user.nickname,
    role: user.role,
  } as Payload;
  const token = TokenProvider.generateAccessToken(payload);
  const refreshToken = TokenProvider.generateRefreshToken(payload);

  return { token, refreshToken, payload };
};
