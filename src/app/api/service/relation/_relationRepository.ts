import { InternalServerError } from "@/types/api/error/InternalError";
import { Auth } from "../auth/Auth";
import { supabase } from "../../lib/supabase/_supabaseClient";
import User from "../user/User";

export const relationRepository = {
  insertUserAndAuth: async ({ user_id, auth_id }: { user_id: User["id"]; auth_id: Auth["id"] }): Promise<void> => {
    const { error } = await supabase.from("r_user_auth").insert({ user_id, auth_id }).select();

    if (error) {
      console.error("[insertUserAndAuth] Error:", error);
      throw new InternalServerError("user-auth 관계 생성 중 오류가 발생했습니다.");
    }
  },
};
