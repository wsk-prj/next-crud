import { supabase } from "../supabase/supabaseClient";
import { Auth } from "./Auth";

export const insertAuth = async (auth: Auth) => {
  const { data, error } = await supabase
    .from("auth")
    .insert([{ id: auth.id, loginid: auth.loginid, loginpw: auth.loginpw }])
    .select();

  if (error) {
    console.error("회원가입 중 오류 발생:", error);
    throw new Error("회원가입에 실패했습니다. 다시 시도해 주세요.");
  }

  return data;
};

export const findAuthById = async (loginid: Auth["loginid"]) => {
  const { data, error } = await supabase.from("auth").select("*").eq("loginid", loginid);

  if (data == null || data.length === 0) {
    throw new Error("존재하지 않는 아이디입니다.");
  }

  if (error) {
    console.error("로그인 중 오류 발생:", error);
    throw new Error("로그인에 실패했습니다. 다시 시도해 주세요.");
  }

  return data[0];
};
