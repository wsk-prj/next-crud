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
    console.log(`[jwtUtil] generateToken\n    ${JSON.stringify(jwtPayload)}`);
    const token = jwt.sign(jwtPayload, JWT_SECRET, {
      expiresIn,
      issuer,
      audience,
    });
    console.log(`[jwtUtil] Generated Token\n    ${token}`);
    return token;
  },

  /**
   * 토큰 디코딩
   */
  decodeToken: (token: string): jwt.JwtPayload => {
    try {
      console.log(`[jwtUtil] decodeToken\n    ${token}`);
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      console.log(`[jwtUtil] Decoded Token\n    ${JSON.stringify(decoded)}`);
      return decoded;
    } catch {
      console.log(`[jwtUtil] Invalid token\n    ${token}`);
      throw new Error("Invalid token");
    }
  },

  /**
   * 토큰 검증(만료여부 제외)
   */
  verifyTokenValid: (token: string): jwt.JwtPayload => {
    try {
      console.log(`[jwtUtil] verifyTokenValid\n    ${token}`);
      const decoded = jwt.verify(token, JWT_SECRET, {
        ignoreExpiration: true,
      }) as jwt.JwtPayload;
      console.log(`[jwtUtil] Verified Token\n    ${JSON.stringify(decoded)}`);
      return decoded;
    } catch {
      console.log(`[jwtUtil] Invalid token\n    ${token}`);
      throw new Error("Invalid token");
    }
  },

  /**
   * 토큰 만료 여부 확인
   */
  verifyTokenExpired: (token: string): void => {
    console.log(`[jwtUtil] verifyTokenExpired\n    ${token}`);
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    if (!decoded || !decoded.exp) {
      throw new Error("Invalid token");
    }

    const expiry = decoded.exp * 1000;
    const current = Date.now();

    if (current >= expiry) {
      console.log(`[jwtUtil] Token expired\n    ${token}`);
      throw new Error("Token expired");
    }
  },
};
