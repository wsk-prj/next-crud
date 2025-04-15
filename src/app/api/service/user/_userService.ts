import { userRepository } from "@/app/api/service/user/_userRepository";
import { UserProfile } from "@/app/api/service/user/dto/response/UserProfile";
import { User } from "@/app/api/service/user/User";
import { UserRequest } from "./dto/request/UserRequest";

export const userService = {
  insertUser: async (userRequest: UserRequest): Promise<User> => {
    const user = User.from(userRequest);
    return await userRepository.insertUser(user);
  },
  getUserProfile: async (id: number): Promise<UserProfile> => {
    const user = await userRepository.findUserById(id);
    return UserProfile.from(user);
  },
  updateUserProfile: async (id: number, userRequest: UserRequest): Promise<User> => {
    const user = User.from(userRequest);
    return await userRepository.updateUser(id, user);
  },
  withdrawUser: async (id: number): Promise<void> => {
    await userRepository.deleteUser(id);
  },
};
