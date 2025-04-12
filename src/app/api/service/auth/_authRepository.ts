import { NotFoundError } from "@/types/api/error/BadRequest";
import { supabase } from "../../lib/supabase/_supabaseClient";
import { Auth } from "./Auth";
import { ExternalServiceError } from "@/types/api/error/InternalError";

export const authRepository = {
  insertAuth: async (auth: Auth): Promise<number> => {
    const { data, error } = await supabase
      .from("auth")
      .insert([{ loginid: auth.loginid, loginpw: auth.loginpw }])
      .select();

    if (error) {
      console.error("[insertAuth] Error:", error);
      throw new ExternalServiceError("회원가입 중 오류가 발생했습니다.");
    }

    if (data?.[0] == null) {
      throw new NotFoundError("로그인 정보가 존재하지 않습니다.");
    }

    return data[0].id;
  },
  findAuthById: async (loginid: Auth["loginid"]): Promise<Auth> => {
    const { data, error } = await supabase.from("auth").select("*").eq("loginid", loginid);

    if (error) {
      console.error("[findAuthById] Error:", error);
      throw new ExternalServiceError("회원 정보를 가져오는 중 오류가 발생했습니다.");
    }

    if (data?.[0] == null) {
      throw new NotFoundError("로그인 정보가 존재하지 않습니다.");
    }

    return data[0];
  },
};
