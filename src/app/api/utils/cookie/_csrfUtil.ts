import redis from "@/app/api/lib/redis/_redis";
import { ForbiddenError } from "@/types/api/error/BadRequest";
import { nanoid } from "nanoid";

const REDIS_KEY = "csrf:global";

const csrfUtil = {
  getToken: async (): Promise<string> => {
    const existing = await redis.get(REDIS_KEY);
    if (existing) return existing;

    const token = nanoid(64);
    await redis.set(REDIS_KEY, token, "EX", 60);
    return token;
  },
  validateToken: async (token: string): Promise<void> => {
    const current = await redis.get(REDIS_KEY);
    if (token !== current) {
      throw new ForbiddenError("요청이 유효하지 않습니다.");
    }
  },
};

export default csrfUtil;
