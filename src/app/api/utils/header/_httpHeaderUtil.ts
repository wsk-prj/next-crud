import { UnauthorizedError } from "@/types/api/error/BadRequest";
import { InternalServerError } from "@/types/api/error/InternalError";
import { headers } from "next/headers";

const httpHeaderUtil = {
  setHeader: (header: { key: string; value: string }): void => {
    headers().set(header.key, header.value);
  },
  getHeader: (key: string): string => {
    const header = headers().get(key);
    if (!header) {
      throw new InternalServerError("헤더 값이 존재하지 않습니다.");
    }
    return header;
  },
  getAuthorization: (): string => {
    const authorization = headers().get("Authorization");
    if (!authorization) {
      throw new UnauthorizedError("잘못된 요청입니다.");
    }
    return authorization.split(" ")[1];
  },
};

export default httpHeaderUtil;
