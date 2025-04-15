import { BadRequestError } from "@/types/api/error/BadRequest";

const BOARD_TITLE_MIN_LENGTH = 1;
const BOARD_TITLE_MAX_LENGTH = 50;

export class BoardTitle {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static of(value: string | undefined): BoardTitle {
    BoardTitle.validate(value!);
    return new BoardTitle(value!);
  }

  private static validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new BadRequestError("게시글 제목은 빈 값이 될 수 없습니다.");
    }
    if (value.length < BOARD_TITLE_MIN_LENGTH) {
      throw new BadRequestError(`게시글 제목은 최소 ${BOARD_TITLE_MIN_LENGTH}자 이상이어야 합니다.`);
    }
    if (value.length > BOARD_TITLE_MAX_LENGTH) {
      throw new BadRequestError(`게시글 제목은 최대 ${BOARD_TITLE_MAX_LENGTH}자 이하여야 합니다.`);
    }
  }

  toJSON(): string {
    return this.value;
  }
}
