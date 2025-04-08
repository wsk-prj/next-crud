import { Auth } from "@/lib/auth/Auth";
import bcrypt from "bcrypt";
import { supabase } from "../supabase/supabaseClient";
import User from "./User";

export interface RegisterDTO {
  loginid: Auth["loginid"];
  loginpw: Auth["loginpw"];
  nickname: User["nickname"];
}

export const signup = async (dto: RegisterDTO) => {
  // 비밀번호 해싱(Bcrypt)
  const hashedPassword = await bcrypt.hash(dto.loginpw, 10);

  // Supabase에 사용자 정보를 삽입
  const { data, error: userError } = await supabase
    .from("user")
    .insert([{ nickname: dto.nickname }])
    .select();
  const { error: authError } = await supabase
    .from("auth")
    .insert([{ id: data?.[0].id, loginid: dto.loginid, loginpw: hashedPassword }]);

  // 오류 처리
  if (authError || userError) {
    console.error("회원가입 중 오류 발생:", authError || userError);
    throw new Error("회원가입에 실패했습니다. 다시 시도해 주세요.");
  }
};
