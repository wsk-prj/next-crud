import tokenProvider, { Payload } from "@/lib/_tokenProvider";
import TokenProvider from "@/lib/_tokenProvider";
import bcrypt from "bcrypt";
import { userRepository } from "../user/_userRepository";
import { Auth } from "./Auth";
import cookieUtil from "@/utils/cookie/_cookieUtil";
import { BadRequestError } from "@/types/error/BadRequest";
import { authRepository } from "./_authRepository";

export interface LoginRequest {
  loginid: Auth["loginid"];
  loginpw: Auth["loginpw"];
}

export interface LoginResponse {
  payload: Payload;
}

export const authService = {
  login: async (request: LoginRequest): Promise<void> => {
    // 사용자가 입력한 id가 존재하는지 확인
    const auth = await authRepository.findAuthById(request.loginid);

    // 사용자가 입력한 비밀번호와 해싱된 비밀번호가 일치하는지 확인
    const isPasswordEquals = await bcrypt.compare(request.loginpw, auth.loginpw);
    if (!isPasswordEquals) {
      throw new BadRequestError("로그인 정보가 잘못되었습니다.");
    }

    const user = await userRepository.findUserById(auth.id);

    // JWT 토큰 발급
    const payload = {
      sub: String(user.id),
      nickname: user.nickname,
      role: user.role,
    } as Payload;
    const token = TokenProvider.generateAccessToken(payload);
    const refreshToken = TokenProvider.generateRefreshToken(payload);

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
  },
  updateAccessToken: async (refreshToken: string): Promise<void> => {
    const refreshTokenPayload = TokenProvider.getPayload(refreshToken);
    const user = await userRepository.findUserById(Number(refreshTokenPayload.sub));

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
  },
  updateRefreshToken: async (refreshToken: string): Promise<void> => {
    if (!tokenProvider.shouldRefreshToken(refreshToken)) {
      return;
    }

    const refreshTokenPayload = TokenProvider.getPayload(refreshToken);

    const payload = {
      sub: String(refreshTokenPayload.sub),
    } as Payload;
    const newRefreshToken = TokenProvider.generateRefreshToken(payload);

    cookieUtil.setCookie(
      { key: "refreshToken", value: newRefreshToken },
      {
        maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRY),
      }
    );
  },
};
