import { Auth } from "@/lib/auth/Auth";
import bcrypt from "bcrypt";
import User from "./User";
import { insertAuth } from "../auth/_authRepository";
import { insertUser } from "./_userRepository";
export interface RegisterDTO {
  loginid: Auth["loginid"];
  loginpw: Auth["loginpw"];
  nickname: User["nickname"];
}

export const signup = async (dto: RegisterDTO) => {
  // 비밀번호 해싱(Bcrypt)
  const hashedPassword = await bcrypt.hash(dto.loginpw, 10);

  // Supabase에 사용자 정보를 삽입
  try {
    const user = await insertUser({ nickname: dto.nickname } as User);
    await insertAuth({ id: user?.[0].id, loginid: dto.loginid, loginpw: hashedPassword } as Auth);
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);
    throw new Error("회원가입에 실패했습니다. 다시 시도해 주세요.");
  }
};
