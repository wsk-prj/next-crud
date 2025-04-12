import jwt from "jsonwebtoken";
import User from "@/app/api/service/user/User";
import { jwtUtil } from "../utils/jwt/_jwtUtil";

const JWT_ACCESS_TOKEN_EXPIRY: number = Number(process.env.JWT_ACCESS_TOKEN_EXPIRY!);
const JWT_REFRESH_TOKEN_EXPIRY: number = Number(process.env.JWT_REFRESH_TOKEN_EXPIRY!);
const JWT_REFRESH_TOKEN_EXPIRY_THRESHOLD: number = Number(process.env.JWT_REFRESH_TOKEN_EXPIRY_THRESHOLD!);

export interface Payload extends jwt.JwtPayload {
  sub: jwt.JwtPayload["sub"];
  nickname: User["nickname"];
  role: User["role"];
}

const tokenProvider = {
  /**
   * 토큰에서 페이로드 추출
   */
  getPayload: (token: string): Payload => {
    const decoded = jwtUtil.decodeToken(token) as Payload;
    return {
      sub: decoded.sub,
      nickname: decoded.nickname,
      role: decoded.role,
    };
  },

  /**
   * 액세스 토큰 발급
   */
  generateAccessToken: (payload: Payload): string => {
    const token = jwtUtil.generateToken(
      {
        sub: String(payload.sub),
        nickname: payload.nickname,
        role: payload.role,
      },
      { expiresIn: JWT_ACCESS_TOKEN_EXPIRY }
    );
    return token;
  },

  /**
   * 리프레시 토큰 발급
   */
  generateRefreshToken: ({ sub }: Payload): string => {
    const token = jwtUtil.generateToken(
      {
        sub: String(sub),
      },
      { expiresIn: JWT_REFRESH_TOKEN_EXPIRY }
    );
    return token;
  },

  /**
   * 리프레시 토큰 갱신
   */
  updateRefreshToken: (token: string): string => {
    if (tokenProvider.shouldRefreshToken(token)) {
      const payload = jwtUtil.decodeToken(token) as Payload;
      return tokenProvider.generateRefreshToken(payload);
    }
    return token;
  },

  shouldRefreshToken: (token: string): boolean => {
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      if (!decoded || !decoded.exp) return true;

      const expiry = decoded.exp * 1000;
      const current = Date.now();
      const timeToExpiry = expiry - current;

      return timeToExpiry < JWT_REFRESH_TOKEN_EXPIRY * JWT_REFRESH_TOKEN_EXPIRY_THRESHOLD;
    } catch {
      return true;
    }
  },
};

export default tokenProvider;
