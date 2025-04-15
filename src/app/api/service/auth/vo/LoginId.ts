import { BadRequestError } from "@/types/api/error/BadRequest";

const LOGIN_ID_MIN_LENGTH = 4;
const LOGIN_ID_MAX_LENGTH = 20;
const LOGIN_ID_REGEX = /^[a-zA-Z0-9]+$/;

export class LoginId {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  static of(value: string | undefined): LoginId {
    LoginId.validate(value!);
    return new LoginId(value!);
  }

  private static validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new BadRequestError("아이디는 빈 값이 될 수 없습니다.");
    }
    if (value.length < LOGIN_ID_MIN_LENGTH) {
      throw new BadRequestError(`아이디는 ${LOGIN_ID_MIN_LENGTH}자 이상이어야 합니다.`);
    }
    if (value.length > LOGIN_ID_MAX_LENGTH) {
      throw new BadRequestError(`아이디는 ${LOGIN_ID_MAX_LENGTH}자 이하여야 합니다.`);
    }
    if (!LOGIN_ID_REGEX.test(value)) {
      throw new BadRequestError("아이디는 영문자와 숫자만 포함할 수 있습니다.");
    }
  }

  toJSON(): string {
    return this.value;
  }
}
