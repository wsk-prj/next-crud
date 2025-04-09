import { Auth } from "@/lib/auth/Auth";
import bcrypt from "bcrypt";
import User, { UserProfile } from "./User";
import { insertAuth } from "../auth/_authRepository";
import { deleteUserById, findUserById, insertUser } from "./_userRepository";
import { GET } from "@/scripts/api/apiClient";
import User from "./User";
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

export const getUserProfile = async (id: User["id"]): Promise<UserProfile> => {
  try {
    const user = await findUserById(id);
    return user as UserProfile;
  } catch (error) {
    console.error("[getUserProfile] Error:", error);
    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
  }
};

export async function withdrawUser(id: User["id"]): Promise<void> {
  try {
    await deleteUserById(id);
  } catch (error) {
    console.error("[withdrawUser] Error:", error);
    throw new Error("회원 탈퇴 중 오류가 발생했습니다.");
  }
}
