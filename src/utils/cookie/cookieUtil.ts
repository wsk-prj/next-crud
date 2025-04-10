import { cookies } from "next/headers";

interface Cookie {
  key: string;
  value: string;
}

interface CookieOptions {
  maxAge: number;
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

const cookieUtil = {
  setCookie: (
    { key, value }: Cookie,
    {
      maxAge,
      path = "/",
      httpOnly = true,
      secure = process.env.NODE_ENV === "production",
      sameSite = "strict",
    }: CookieOptions
  ) => {
    cookies().set(key, value, {
      maxAge,
      path,
      httpOnly,
      secure,
      sameSite,
    });
  },

  getCookie: (key: Cookie["key"]): string => {
    const cookie = cookies().get(key)?.value;

    if (cookie == null) {
      throw new Error(`[cookieUtil] getCookie: not found`);
    }

    return cookie;
  },

  getAllCookies: (): Cookie[] => {
    return cookies()
      .getAll()
      .map((cookie) => ({
        key: cookie.name,
        value: cookie.value,
      }));
  },

  deleteCookie: (key: Cookie["key"]): void => {
    cookies().delete(key);
  },

  hasCookie: (key: Cookie["key"]): boolean => {
    return cookies().has(key);
  },
};

export default cookieUtil;
