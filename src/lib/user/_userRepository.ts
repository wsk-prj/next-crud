import { supabase } from "../supabase/supabaseClient";
import User from "./User";

export const insertUser = async (user: User): Promise<void> => {
  const { error } = await supabase
    .from("user")
    .insert([{ nickname: user.nickname }])
    .select();

  if (error) {
    console.error("[insertUser] Error:", error);
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
};

export const findUserById = async (id: User["id"]): Promise<User | null> => {
  const { data, error } = await supabase.from("user").select("*").eq("id", id);

  if (error) {
    console.error("[findUserById] Error:", error);
    throw new Error("회원 정보를 가져오는 중 오류가 발생했습니다.");
  }

  if (data == null || data.length === 0) {
    throw new Error("회원 정보가 존재하지 않습니다.");
  }

  return data[0];
};
