import { NotFoundError } from "@/types/api/error/BadRequest";
import { ExternalServiceError } from "@/types/api/error/InternalError";
import { supabase } from "../../lib/supabase/_supabaseClient";
import { User } from "./User";

const USER_TABLE_NAME = "user";
const USER_MESSAGE_NOT_FOUND = "사용자 정보가 존재하지 않습니다.";

export const userRepository = {
  insertUser: async (user: User): Promise<User> => {
    const { data, error } = await supabase.from(USER_TABLE_NAME).insert(user.serialize()).select();

    if (error) {
      throw new ExternalServiceError(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundError(USER_MESSAGE_NOT_FOUND);
    }

    return User.from(data[0]);
  },
  findUserById: async (id: number): Promise<User> => {
    const { data, error } = await supabase.from(USER_TABLE_NAME).select("*").eq("id", id).eq("is_deleted", false);

    if (error) {
      throw new ExternalServiceError(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundError(USER_MESSAGE_NOT_FOUND);
    }

    return User.from(data[0]);
  },
  updateUser: async (id: number, user: User): Promise<User> => {
    const { data: dbUser, error: fetchError } = await supabase
      .from(USER_TABLE_NAME)
      .select("*")
      .eq("id", id)
      .eq("is_deleted", false);

    if (fetchError) {
      throw new ExternalServiceError(fetchError.message);
    }
    if (dbUser.length === 0) {
      throw new NotFoundError(USER_MESSAGE_NOT_FOUND);
    }

    const { data: updatedData, error: updateError } = await supabase
      .from(USER_TABLE_NAME)
      .update({ ...dbUser[0], ...user.serialize(), updated_at: new Date() })
      .eq("id", id)
      .eq("is_deleted", false)
      .select();

    if (updateError) {
      throw new ExternalServiceError(updateError.message);
    }
    if (updatedData.length === 0) {
      throw new NotFoundError(USER_MESSAGE_NOT_FOUND);
    }

    return User.from(updatedData[0]);
  },
  deleteUser: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from(USER_TABLE_NAME)
      .update({ is_deleted: true, updated_at: new Date() })
      .eq("id", id);

    if (error) {
      throw new ExternalServiceError(error.message);
    }
  },
  hardDeleteUser: async (id: number): Promise<void> => {
    const { error } = await supabase.from(USER_TABLE_NAME).delete().eq("id", id);

    if (error) {
      throw new ExternalServiceError(error.message);
    }
  },
};
