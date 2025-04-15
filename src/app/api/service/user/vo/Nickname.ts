import { BadRequestError } from "@/types/api/error/BadRequest";

const NICKNAME_MIN_LENGTH = 2;
const NICKNAME_MAX_LENGTH = 20;
const NICKNAME_REGEX = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+$/;

export class Nickname {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static of(value: string | undefined): Nickname {
    Nickname.validate(value!);
    return new Nickname(value!);
  }

  private static validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new BadRequestError("닉네임은 빈 값이 될 수 없습니다.");
    }
    if (value.length < NICKNAME_MIN_LENGTH) {
      throw new BadRequestError(`닉네임은 ${NICKNAME_MIN_LENGTH}자 이상이어야 합니다.`);
    }
    if (value.length > NICKNAME_MAX_LENGTH) {
      throw new BadRequestError(`닉네임은 ${NICKNAME_MAX_LENGTH}자 이하여야 합니다.`);
    }
    if (!NICKNAME_REGEX.test(value)) {
      throw new BadRequestError("닉네임은 알파벳, 숫자만 포함할 수 있습니다.");
    }
  }

  toJSON(): string {
    return this.value;
  }
}
