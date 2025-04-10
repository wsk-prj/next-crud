import { InternalServerError } from "@/types/error/InternalError";
import { supabase } from "../supabase/supabaseClient";
import User from "./User";
import { NotFoundError } from "@/types/error/BadRequest";

export const insertUser = async (user: User): Promise<void> => {
  const { error } = await supabase
    .from("user")
    .insert([{ nickname: user.nickname }])
    .select();

  if (error) {
    console.error("[insertUser] Error:", error);
    throw new InternalServerError("회원가입 중 오류가 발생했습니다.");
  }
};

export const findUserById = async (id: User["id"]): Promise<User | null> => {
  const { data, error } = await supabase.from("user").select("*").eq("id", id).eq("is_deleted", false);

  if (error) {
    console.error("[findUserById] Error:", error);
    throw new InternalServerError("회원 정보를 가져오는 중 오류가 발생했습니다.");
  }

  if (data == null || data.length === 0) {
    throw new NotFoundError("회원 정보가 존재하지 않습니다.");
  }

  console.log("[findUserById] data:", data);
  return data[0];
};

export const updateUserById = async (id: User["id"], { nickname }: Pick<User, "nickname">): Promise<void> => {
  const { error } = await supabase.from("user").update({ nickname, updated_at: new Date() }).eq("id", id);

  if (error) {
    console.error("[updateUserById] Error:", error);
    throw new InternalServerError("사용자 정보를 수정하는 중 오류가 발생했습니다.");
  }
};

export async function deleteUserById(id: User["id"]): Promise<void> {
  const { error } = await supabase.from("user").update({ updated_at: new Date(), is_deleted: true }).eq("id", id);

  if (error) {
    console.error("[deleteUserById] Error:", error);
    throw new InternalServerError("사용자 삭제 중 오류가 발생했습니다.");
  }
}
