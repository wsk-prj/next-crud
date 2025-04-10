import { Payload } from "@/lib/tokenProvider";
import TokenProvider from "@/lib/tokenProvider";
import bcrypt from "bcrypt";
import { findUserById } from "../user/_userRepository";
import { Auth } from "./Auth";
import { findAuthById } from "./_authRepository";
import cookieUtil from "@/utils/cookie/cookieUtil";
import { BadRequestError, NotFoundError } from "@/types/error/BadRequest";

export interface LoginRequest {
  loginid: Auth["loginid"];
  loginpw: Auth["loginpw"];
}

export interface LoginResponse {
  payload: Payload;
}

export const login = async (request: LoginRequest): Promise<void> => {
  // 사용자가 입력한 id가 존재하는지 확인
  const auth = await findAuthById(request.loginid);

  if (auth == null) {
    throw new BadRequestError("로그인 정보가 잘못되었습니다.");
  }

  // 사용자가 입력한 비밀번호와 해싱된 비밀번호가 일치하는지 확인
  const isPasswordEquals = await bcrypt.compare(request.loginpw, auth.loginpw);
  if (!isPasswordEquals) {
    throw new BadRequestError("로그인 정보가 잘못되었습니다.");
  }

  const user = await findUserById(auth.id);

  if (user == null) {
    throw new NotFoundError("회원 정보가 존재하지 않습니다.");
  }

  const payload = {
    sub: String(user.id),
    nickname: user.nickname,
    role: user.role,
  } as Payload;

  // JWT 토큰 발급
  const token = TokenProvider.generateAccessToken(payload);
  const refreshToken = TokenProvider.generateRefreshToken(payload);

  // 쿠키에 토큰 설정
  cookieUtil.setCookie(
    { key: "accessToken", value: token },
    {
      maxAge: Number(process.env.JWT_ACCESS_TOKEN_EXPIRY),
    }
  );

  cookieUtil.setCookie(
    { key: "refreshToken", value: refreshToken },
    {
      maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRY),
    }
  );
};

export const updateAccessToken = async (refreshToken: string): Promise<void> => {
  const refreshTokenPayload = TokenProvider.getPayload(refreshToken);
  const user = await findUserById(Number(refreshTokenPayload.sub));

  if (user == null) {
    throw new NotFoundError("회원 정보가 존재하지 않습니다.");
  }

  const payload = {
    sub: String(user.id),
    nickname: user.nickname,
    role: user.role,
  } as Payload;
  const accessToken = TokenProvider.generateAccessToken(payload);

  cookieUtil.setCookie(
    { key: "accessToken", value: accessToken },
    {
      maxAge: Number(process.env.JWT_ACCESS_TOKEN_EXPIRY),
    }
  );
};
