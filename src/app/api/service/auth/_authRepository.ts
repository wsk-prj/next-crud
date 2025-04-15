import { NotFoundError } from "@/types/api/error/BadRequest";
import { ExternalServiceError } from "@/types/api/error/InternalError";
import { supabase } from "../../lib/supabase/_supabaseClient";
import { Auth } from "./Auth";

const AUTH_TABLE_NAME = "auth";
const AUTH_MESSAGE_NOT_FOUND = "로그인 정보가 존재하지 않습니다.";

export const authRepository = {
  insertAuth: async (auth: Auth): Promise<Auth> => {
    const { data, error } = await supabase.from(AUTH_TABLE_NAME).insert(auth).select();

    if (error) {
      throw new ExternalServiceError(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundError(AUTH_MESSAGE_NOT_FOUND);
    }

    return Auth.from(data[0]);
  },
  findAuthByLoginId: async (loginid: string): Promise<Auth> => {
    const { data, error } = await supabase.from(AUTH_TABLE_NAME).select("*").eq("loginid", loginid);

    if (error) {
      throw new ExternalServiceError(error.message);
    }
    if (data.length === 0) {
      throw new NotFoundError(AUTH_MESSAGE_NOT_FOUND);
    }

    return Auth.from(data[0]);
  },
  deleteAuth: async (id: number): Promise<void> => {
    const { error } = await supabase.from(AUTH_TABLE_NAME).update({ is_deleted: true }).eq("id", id);

    if (error) {
      throw new ExternalServiceError(error.message);
    }
  },
  hardDeleteAuth: async (id: number): Promise<void> => {
    const { error } = await supabase.from(AUTH_TABLE_NAME).delete().eq("id", id);

    if (error) {
      throw new ExternalServiceError(error.message);
    }
  },
};
