import jwt from "jsonwebtoken";
import User from "@/lib/user/User";
import { jwtUtil } from "../utils/jwt/jwtUtil";

const JWT_ACCESS_TOKEN_EXPIRY: number = Number(process.env.JWT_ACCESS_TOKEN_EXPIRY!);
const JWT_REFRESH_TOKEN_EXPIRY: number = Number(process.env.JWT_REFRESH_TOKEN_EXPIRY!);
const JWT_REFRESH_TOKEN_EXPIRY_THRESHOLD: number = Number(process.env.JWT_REFRESH_TOKEN_EXPIRY_THRESHOLD!);

export interface Payload extends jwt.JwtPayload {
  nickname: User["nickname"];
  role: User["role"];
}

const TokenProvider = {
  /**
   * 액세스 토큰 발급
   */
  generateAccessToken: (payload: Payload): string => {
    console.log(`[TokenProvider] generateAccessToken\n    ${JSON.stringify(payload)}`);
    const token = jwtUtil.generateToken(
      {
        sub: String(payload.sub),
        nickname: payload.nickname,
        role: payload.role,
      },
      { expiresIn: JWT_ACCESS_TOKEN_EXPIRY }
    );
    console.log(`[TokenProvider] Generated Access Token\n    ${token}`);
    return token;
  },

  /**
   * 리프레시 토큰 발급
   */
  generateRefreshToken: ({ sub }: Payload): string => {
    console.log(`[TokenProvider] generateRefreshToken\n    ${JSON.stringify({ sub })}`);
    const token = jwtUtil.generateToken(
      {
        sub: String(sub),
      },
      { expiresIn: JWT_REFRESH_TOKEN_EXPIRY }
    );
    console.log(`[TokenProvider] Generated Refresh Token\n    ${token}`);
    return token;
  },

  /**
   * 리프레시 토큰 갱신
   */
  updateRefreshToken: (token: string): string => {
    if (TokenProvider.shouldRefreshToken(token)) {
      const payload = jwtUtil.decodeToken(token) as Payload;
      return TokenProvider.generateRefreshToken(payload);
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

export default TokenProvider;
