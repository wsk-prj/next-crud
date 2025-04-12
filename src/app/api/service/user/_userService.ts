import { Auth } from "@/app/api/service/auth/Auth";
import bcrypt from "bcrypt";
import User, { UserProfile } from "@/app/api/service/user/User";
import { ServiceError } from "@/types/api/error/InternalError";
import { userRepository } from "@/app/api/service/user/_userRepository";
import { authRepository } from "@/app/api/service/auth/_authRepository";
import { relationRepository } from "@/app/api/service/relation/_relationRepository";
export interface RegisterRequest {
  loginid: Auth["loginid"];
  loginpw: Auth["loginpw"];
  nickname: User["nickname"];
}

export const userService = {
  signup: async (request: RegisterRequest): Promise<void> => {
    // 비밀번호 해싱(Bcrypt)
    const hashedPassword = await bcrypt.hash(request.loginpw, 10);

    // Supabase에 사용자 정보를 삽입
    try {
      const user_id = await userRepository.insertUser({ nickname: request.nickname } as User);
      const auth_id = await authRepository.insertAuth({ loginid: request.loginid, loginpw: hashedPassword } as Auth);
      await relationRepository.insertUserAndAuth({ user_id, auth_id });
    } catch (error) {
      console.error("[signup] Error:", error);
      throw new ServiceError("회원가입 중 오류가 발생했습니다.");
    }
  },
  getUserProfile: async (id: User["id"]): Promise<UserProfile> => {
    try {
      const user = await userRepository.findUserById(id);
      return user as UserProfile;
    } catch (error) {
      console.error("[getUserProfile] Error:", error);
      throw new ServiceError("사용자 정보를 가져오는 데 실패했습니다.");
    }
  },
  updateUserProfile: async (id: User["id"], { nickname }: Pick<User, "nickname">): Promise<void> => {
    try {
      await userRepository.updateUserById(id, { nickname });
    } catch (error) {
      console.error("[updateUserProfile] Error:", error);
      throw new ServiceError("사용자 정보를 수정하는 데 실패했습니다.");
    }
  },
  withdrawUser: async (id: User["id"]): Promise<void> => {
    try {
      await userRepository.deleteUserById(id);
    } catch (error) {
      console.error("[withdrawUser] Error:", error);
      throw new ServiceError("회원 탈퇴 중 오류가 발생했습니다.");
    }
  },
};
