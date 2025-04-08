import { generateAccessToken, Payload } from "@/lib/jwt";
import bcrypt from "bcrypt";
import { Auth } from "./Auth";
import { findAuthById } from "./_authRepository";
import { findUserById } from "../user/_userRepository";

export interface LoginDTO {
  loginid: Auth["loginid"];
  loginpw: Auth["loginpw"];
}

export const login = async (dto: LoginDTO) => {
  console.log(dto);
  // 사용자가 입력한 id가 존재하는지 확인
  const auth = await findAuthById(dto.loginid);

  // 사용자가 입력한 비밀번호와 해싱된 비밀번호가 일치하는지 확인
  const isPasswordEquals = await bcrypt.compare(dto.loginpw, auth.loginpw);
  if (!isPasswordEquals) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  // JWT 토큰 발급
  const user = await findUserById(auth.id);

  const payload = {
    sub: String(user.id),
    nickname: user.nickname,
    role: user.role,
  } as Payload;
  const token = generateAccessToken(payload);

  return { token, payload };
};
