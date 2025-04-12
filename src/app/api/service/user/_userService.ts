import { userRepository } from "@/app/api/service/user/_userRepository";
import User, { UserProfile } from "@/app/api/service/user/User";
import { ServiceError } from "@/types/api/error/InternalError";

export const userService = {
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
