import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET!;
const JWT_ISSUER: string = process.env.JWT_ISSUER!;
const JWT_AUDIENCE: string = process.env.JWT_AUDIENCE!;

interface JwtOptions extends jwt.SignOptions {
  expiresIn: number;
  issuer?: string;
  audience?: string;
}

export const jwtUtil = {
  /**
   * 토큰 발급
   */
  generateToken: (
    jwtPayload: jwt.JwtPayload,
    { expiresIn, issuer = JWT_ISSUER, audience = JWT_AUDIENCE }: JwtOptions
  ): string => {
    const token = jwt.sign(jwtPayload, JWT_SECRET, {
      expiresIn,
      issuer,
      audience,
    });
    return token;
  },

  /**
   * 토큰 디코딩
   */
  decodeToken: (token: string): jwt.JwtPayload => {
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      return decoded;
    } catch {
      console.log("[jwtUtil] Invalid token: " + token);
      throw new Error("Invalid token");
    }
  },

  /**
   * 토큰 검증(만료여부 제외)
   */
  verifyTokenValid: (token: string): jwt.JwtPayload => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET, {
        ignoreExpiration: true,
      }) as jwt.JwtPayload;
      return decoded;
    } catch {
      console.log("[jwtUtil] Invalid token: " + token);
      throw new Error("Invalid token");
    }
  },

  /**
   * 토큰 만료 여부 확인
   */
  verifyTokenExpired: (token: string): void => {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    if (!decoded || !decoded.exp) {
      throw new Error("Invalid token");
    }

    const expiry = decoded.exp * 1000;
    const current = Date.now();

    if (current >= expiry) {
      console.log("[jwtUtil] Token expired: " + token);
      throw new Error("Token expired");
    }
  },
};
