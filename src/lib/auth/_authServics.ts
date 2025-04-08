import { generateAccessToken, Payload } from "@/lib/jwt";
import { supabase } from "@/lib/supabase/supabaseClient";
import bcrypt from "bcrypt";
import { Auth } from "./Auth";

export interface LoginDTO {
  loginid: Auth["loginid"];
  loginpw: Auth["loginpw"];
}

export const login = async (dto: LoginDTO) => {
  console.log(dto);
  // 사용자가 입력한 id가 존재하는지 확인
  const { data: authData, error: authError } = await supabase.from("auth").select("*").eq("loginid", dto.loginid);

  if (authData == null || authData.length === 0) {
    throw new Error("존재하지 않는 아이디입니다.");
  }

  if (authError) {
    console.error("로그인 중 오류 발생:", authError);
    throw new Error("로그인에 실패했습니다. 다시 시도해 주세요.");
  }

  // 사용자가 입력한 비밀번호와 해싱된 비밀번호가 일치하는지 확인
  const auth: Auth = authData[0];
  const isPasswordEquals = await bcrypt.compare(dto.loginpw, auth.loginpw);
  if (!isPasswordEquals) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  // JWT 토큰 발급
  const { data: userData, error: userError } = await supabase.from("user").select("*").eq("id", auth.id);

  if (userData == null || userData.length === 0) {
    throw new Error("존재하지 않는 회원입니다.");
  }

  if (userError) {
    console.error("로그인 중 오류 발생:", userError);
    throw new Error("로그인에 실패했습니다. 다시 시도해 주세요.");
  }

  const payload = {
    sub: String(userData[0].id),
    nickname: userData[0].nickname,
    role: userData[0].role,
  } as Payload;
  const token = generateAccessToken(payload);

  return { token, payload };
};
