import { BadRequestError } from "@/types/api/error/BadRequest";

const COMMENT_CONTENT_MIN_LENGTH = 1;
const COMMENT_CONTENT_MAX_LENGTH = 500;

export class CommentContent {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static of(value: string | undefined): CommentContent {
    CommentContent.validate(value!);
    return new CommentContent(value!);
  }

  private static validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new BadRequestError("댓글 내용은 빈 값이 될 수 없습니다.");
    }
    if (value.length < COMMENT_CONTENT_MIN_LENGTH) {
      throw new BadRequestError(`댓글 내용은 최소 ${COMMENT_CONTENT_MIN_LENGTH}자 이상이어야 합니다.`);
    }
    if (value.length > COMMENT_CONTENT_MAX_LENGTH) {
      throw new BadRequestError(`댓글 내용은 최대 ${COMMENT_CONTENT_MAX_LENGTH}자 이하여야 합니다.`);
    }
  }

  toJSON(): string {
    return this.value;
  }
}
