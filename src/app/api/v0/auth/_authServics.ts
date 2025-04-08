import { supabase } from "@/lib/supabase/supabaseClient";
import { LoginDTO, RegisterDTO } from "@/lib/user/User";
import bcrypt from "bcrypt";

export const signup = async (dto: RegisterDTO) => {
  // 비밀번호 해싱(Bcrypt)
  const hashedPassword = await bcrypt.hash(dto.loginpw, 10);

  // Supabase에 사용자 정보를 삽입
  const { error } = await supabase.from("user").insert([{ loginid: dto.loginid, loginpw: hashedPassword }]);

  // 오류 처리
  if (error) {
    console.error("회원가입 중 오류 발생:", error);
    throw new Error("회원가입에 실패했습니다. 다시 시도해 주세요.");
  }

  return { message: "회원가입이 완료되었습니다." };
};

export const login = async (dto: LoginDTO) => {
  console.log(dto);
  // 사용자가 입력한 id가 존재하는지 확인
  const { data, error } = await supabase.from("user").select("*").eq("loginid", dto.loginid);

  if (data?.length === 0) {
    throw new Error("존재하지 않는 아이디입니다.");
  }

  if (error) {
    console.error("로그인 중 오류 발생:", error);
    throw new Error("로그인에 실패했습니다. 다시 시도해 주세요.");
  }

  // 사용자가 입력한 비밀번호와 해싱된 비밀번호가 일치하는지 확인
  const isPasswordValid = await bcrypt.compare(dto.loginpw, data?.[0].loginpw);
  if (!isPasswordValid) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  return { message: "로그인이 완료되었습니다." };
};
