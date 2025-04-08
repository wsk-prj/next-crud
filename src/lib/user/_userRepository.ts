import { supabase } from "../supabase/supabaseClient";
import User from "./User";

export const insertUser = async (user: User) => {
  const { data, error } = await supabase
    .from("user")
    .insert([{ nickname: user.nickname }])
    .select();

  if (error) {
    console.error("회원가입 중 오류 발생:", error);
    throw new Error("회원가입에 실패했습니다. 다시 시도해 주세요.");
  }

  return data;
};

export const findUserById = async (id: User["id"]) => {
  const { data, error } = await supabase.from("user").select("*").eq("id", id);

  if (data == null || data.length === 0) {
    throw new Error("존재하지 않는 회원입니다.");
  }

  if (error) {
    console.error("유저 조회 중 오류 발생:", error);
    throw new Error("유저 조회에 실패했습니다. 다시 시도해 주세요.");
  }

  return data[0];
};
