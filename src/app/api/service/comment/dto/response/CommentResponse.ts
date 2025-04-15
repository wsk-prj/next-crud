import { Comment } from "../../Comment";

export class CommentResponse {
  readonly id?: number;
  readonly board_id?: number;
  readonly user_id?: number;
  readonly content?: string;
  readonly parent_id?: number;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  private constructor(props: Comment) {
    this.id = props.id;
    this.board_id = props.board_id;
    this.user_id = props.user_id;
    this.content = props.content?.value;
    this.parent_id = props.parent_id;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static from(props: Comment): CommentResponse {
    return new CommentResponse(props);
  }
}
