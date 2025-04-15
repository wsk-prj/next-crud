import { BadRequestError } from "@/types/api/error/BadRequest";

const BOARD_CONTENT_MIN_LENGTH = 1;
const BOARD_CONTENT_MAX_LENGTH = 1000;

export class BoardContent {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static of(value: string | undefined): BoardContent {
    BoardContent.validate(value!);
    return new BoardContent(value!);
  }

  private static validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new BadRequestError("게시글 내용은 빈 값이 될 수 없습니다.");
    }
    if (value.length < BOARD_CONTENT_MIN_LENGTH) {
      throw new BadRequestError(`게시글 내용은 최소 ${BOARD_CONTENT_MIN_LENGTH}자 이상이어야 합니다.`);
    }
    if (value.length > BOARD_CONTENT_MAX_LENGTH) {
      throw new BadRequestError(`게시글 내용은 최대 ${BOARD_CONTENT_MAX_LENGTH}자 이하여야 합니다.`);
    }
  }

  toJSON(): string {
    return this.value;
  }
}
