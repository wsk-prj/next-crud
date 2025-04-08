import jwt from "jsonwebtoken";
import User from "./user/User";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET as string;
const JWT_ACCESS_TOKEN_EXPIRY: string = process.env.JWT_ACCESS_TOKEN_EXPIRY!;
const JWT_REFRESH_TOKEN_EXPIRY: string = process.env.JWT_REFRESH_TOKEN_EXPIRY!;
const JWT_REFRESH_TOKEN_EXPIRY_THRESHOLD: string = process.env.JWT_REFRESH_TOKEN_EXPIRY_THRESHOLD!;
const JWT_ISSUER: string = process.env.JWT_ISSUER!;
const JWT_AUDIENCE: string = process.env.JWT_AUDIENCE!;

export interface Payload extends jwt.JwtPayload {
  nickname: User["nickname"];
  role: User["role"];
}

/**
 * 액세스 토큰 발급
 */
export const generateAccessToken = (payload: Payload): string => {
  console.log(`GenerateAccessToken: ${payload}`);
  const token = jwt.sign(
    {
      sub: String(payload.sub),
      nickname: payload.nickname,
      role: payload.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    } as jwt.SignOptions
  );
  console.log(`Generated Access Token: ${token}`);
  return token;
};

/**
 * 리프레시 토큰 발급
 */
export const generateRefreshToken = (payload: Payload): string => {
  console.log(`GenerateRefreshToken: ${payload}`);
  const token = jwt.sign(
    {
      sub: String(payload.sub),
    },
    JWT_SECRET,
    { expiresIn: JWT_REFRESH_TOKEN_EXPIRY } as jwt.SignOptions
  );
  console.log(`Generated Refresh Token: ${token}`);
  return token;
};

/**
 * 토큰 디코딩
 */
export const decodeToken = (token: string): Payload => {
  try {
    const decoded = jwt.decode(token) as Payload;
    console.log(`Decoded Payload: ${decoded}`);
    return decoded;
  } catch {
    throw new Error("Invalid token");
  }
};

/**
 * 토큰 검증(만료여부 제외)
 */
export const verifyTokenValid = (token: string): Payload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      ignoreExpiration: true,
    }) as Payload;
    console.log(`Verified Payload: ${decoded}`);
    return decoded;
  } catch {
    throw new Error("Invalid token");
  }
};

/**
 * 토큰 만료 여부 확인
 */
export const verifyTokenExpired = (token: string): boolean => {
  const decoded = jwt.decode(token) as Payload;
  if (!decoded || !decoded.exp) return true;

  const expiry = decoded.exp * 1000;
  const current = Date.now();

  return current >= expiry;
};

/**
 * 리프레시 토큰 갱신
 */
export const refreshToken = (token: string): string => {
  if (shouldRefreshToken(token)) {
    const payload = jwt.decode(token) as Payload;
    return generateRefreshToken(payload);
  }
  return token;
};

const shouldRefreshToken = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as Payload;
    if (!decoded || !decoded.exp) return true;

    // 만료 시간의 20% 이하로 남았으면 갱신 필요
    const expiry = decoded.exp * 1000;
    const current = Date.now();
    const timeToExpiry = expiry - current;

    return timeToExpiry < Number(JWT_REFRESH_TOKEN_EXPIRY) * Number(JWT_REFRESH_TOKEN_EXPIRY_THRESHOLD);
  } catch {
    return true;
  }
};
