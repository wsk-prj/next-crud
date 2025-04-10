import { cookies } from "next/headers";

interface Cookie {
  key: string;
  value: string;
}

interface CookieOptions {
  maxAge?: number;
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

const cookieUtil = {
  setCookie: (
    { key, value }: Cookie,
    { maxAge, path = "/", httpOnly = true, secure = true, sameSite = "strict" }: CookieOptions
  ) => {
    cookies().set(key, value, {
      maxAge,
      path,
      httpOnly,
      secure,
      sameSite,
    });
  },

  getCookie: ({ key }: Cookie) => {
    return cookies().get(key)?.value;
  },

  getAllCookies: () => {
    return cookies().getAll();
  },

  deleteCookie: ({ key }: Cookie) => {
    cookies().delete(key);
  },

  hasCookie: ({ key }: Cookie) => {
    return cookies().has(key);
  },
};

export default cookieUtil;
