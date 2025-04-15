import { BadRequestError } from "@/types/api/error/BadRequest";
import { compare, hash } from "bcrypt";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
const PASSWORD_HASH_SALT_STRENGTH = 10;
const PASSWORD_HASH_PREFIX = "$2b$";

export class LoginPassword {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static async of(password: string | undefined): Promise<LoginPassword> {
    if (password?.startsWith(PASSWORD_HASH_PREFIX)) {
      return new LoginPassword(password);
    }
    LoginPassword.validate(password!);
    return new LoginPassword(await hash(password!, PASSWORD_HASH_SALT_STRENGTH));
  }

  public isMatches(password: string): Promise<boolean> {
    return compare(password, this.value);
  }

  private static validate(password: string): void {
    if (!password || password.trim().length === 0) {
      throw new BadRequestError("비밀번호는 빈 값이 될 수 없습니다.");
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      throw new BadRequestError(`비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`);
    }
    if (password.length > PASSWORD_MAX_LENGTH) {
      throw new BadRequestError(`비밀번호는 ${PASSWORD_MAX_LENGTH}자 이하여야 합니다.`);
    }
    if (!PASSWORD_REGEX.test(password)) {
      throw new BadRequestError("비밀번호는 영문자, 숫자, 특수문자를 조합해야 합니다.");
    }
  }

  toJSON(): string {
    return this.value;
  }
}
