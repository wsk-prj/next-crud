export class CommentRequest {
  readonly board_id: number;
  readonly user_id: number;
  readonly parent_id?: number;
  readonly content: string;

  private constructor(props: CommentRequestProps) {
    this.board_id = props.board_id;
    this.user_id = props.user_id;
    this.content = props.content;
    this.parent_id = props.parent_id;
  }

  static from(props: CommentRequestProps): CommentRequest {
    return new CommentRequest(props);
  }
}

interface CommentRequestProps {
  board_id: number;
  user_id: number;
  parent_id?: number;
  content: string;
}
