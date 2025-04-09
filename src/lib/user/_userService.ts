import { Auth } from "@/lib/auth/Auth";
import bcrypt from "bcrypt";
import User from "./User";
import { insertAuth } from "../auth/_authRepository";
import { insertUser } from "./_userRepository";
export interface RegisterRequest {
  loginid: Auth["loginid"];
  loginpw: Auth["loginpw"];
  nickname: User["nickname"];
}

export const signup = async (request: RegisterRequest): Promise<void> => {
  // 비밀번호 해싱(Bcrypt)
  const hashedPassword = await bcrypt.hash(request.loginpw, 10);

  // Supabase에 사용자 정보를 삽입
  try {
    await insertUser({ nickname: request.nickname } as User);
    await insertAuth({ loginid: request.loginid, loginpw: hashedPassword } as Auth);
  } catch (error) {
    console.error("[signup] Error:", error);
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
};
