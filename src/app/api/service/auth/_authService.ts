import { Payload, default as tokenProvider, default as TokenProvider } from "@/app/api/lib/_tokenProvider";
import cookieUtil from "@/app/api/utils/cookie/_cookieUtil";
import { ForbiddenError } from "@/types/api/error/BadRequest";
import { userRepository } from "../user/_userRepository";
import { UserRequest } from "../user/dto/request/UserRequest";
import { User } from "../user/User";
import { authRepository } from "./_authRepository";
import { transactionalService } from "../_transactionalService";
import { Auth } from "./Auth";
import { AuthRequest } from "./dto/request/AuthRequest";
import httpHeaderUtil from "../../utils/header/_httpHeaderUtil";
import { Token } from "@/types/Token";

export const authService = {
  signup: async (authRequest: AuthRequest, userRequest: UserRequest): Promise<void> => {
    // 사용자 삽입
    let dbUser: User;
    transactionalService.add({
      operation: async () => {
        const user: User = User.from(userRequest);
        dbUser = await userRepository.insertUser(user);
      },
      rollback: async () => {
        await userRepository.hardDeleteUser(dbUser.id!);
      },
    });

    // 로그인 정보 삽입
    let dbAuth: Auth;
    transactionalService.add({
      operation: async () => {
        const auth: Auth = await Auth.from({ ...authRequest, id: dbUser.id });
        dbAuth = await authRepository.insertAuth(auth);
      },
      rollback: async () => {
        await authRepository.hardDeleteAuth(dbAuth.id!);
      },
    });

    await transactionalService.excuteAll();
  },
  login: async (authReqeust: AuthRequest): Promise<Token> => {
    // 로그인 정보 확인
    const dbAuth: Auth = await authRepository.findAuthByLoginId(authReqeust.loginid);
    if (!(await dbAuth.loginpw?.isMatches(authReqeust.loginpw))) {
      throw new ForbiddenError("로그인 정보가 잘못되었습니다.");
    }

    // 액세스, 리프레시 토큰 발급
    const dbUser = await userRepository.findUserById(dbAuth.id!);
    const payload = {
      sub: String(dbUser.id),
      nickname: dbUser.nickname,
      role: dbUser.role,
    } as Payload;
    const accessToken = TokenProvider.generateAccessToken(payload);
    const refreshToken = TokenProvider.generateRefreshToken(payload);

    // 리프레시 토큰 설정(쿠키)
    cookieUtil.setCookie(
      { key: "refreshToken", value: refreshToken },
      {
        maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRY),
      }
    );

    return { token: accessToken };
  },
  updateAccessToken: async (refreshToken: string): Promise<Token> => {
    // 사용자 조회
    const refreshTokenPayload = TokenProvider.getPayload(refreshToken);
    const dbUser = await userRepository.findUserById(Number(refreshTokenPayload.sub));

    // 액세스 토큰 발급
    const payload = {
      sub: String(dbUser.id),
      nickname: dbUser.nickname,
      role: dbUser.role,
    } as Payload;
    const accessToken = TokenProvider.generateAccessToken(payload);

    // 쿠키 설정
    return { token: accessToken };
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
