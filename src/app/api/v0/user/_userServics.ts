import { supabase } from "@/lib/supabase/supabaseClient";
import { RegisterDTO } from "./route";

export const registerUser = async (dto: RegisterDTO) => {
  // Supabase에 사용자 정보를 삽입
  const { error } = await supabase.from("user").insert([{ loginid: dto.loginid, loginpw: dto.loginpw }]);

  // 오류 처리
  if (error) {
    console.error("회원가입 중 오류 발생:", error);
    throw new Error("회원가입에 실패했습니다. 다시 시도해 주세요.");
  }

  return { message: "회원가입이 완료되었습니다." };
};
