import { supabase } from "../supabase/supabaseClient";
import { Auth } from "./Auth";

export const insertAuth = async (auth: Auth): Promise<void> => {
  const { error } = await supabase
    .from("auth")
    .insert([{ id: auth.id, loginid: auth.loginid, loginpw: auth.loginpw }])
    .select();

  if (error) {
    console.error("[insertAuth] Error:", error);
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
};

export const findAuthById = async (loginid: Auth["loginid"]): Promise<Auth | null> => {
  const { data, error } = await supabase.from("auth").select("*").eq("loginid", loginid);

  if (error) {
    console.error("[findAuthById] Error:", error);
    throw new Error("회원 정보를 가져오는 중 오류가 발생했습니다.");
  }

  if (data == null || data.length === 0) {
    throw new Error("로그인 정보가 존재하지 않습니다.");
  }

  return data[0];
};
