import { Board } from "../../Board";

export class BoardResponse {
  readonly id?: number;
  readonly user_id?: number;
  readonly title?: string;
  readonly content?: string;
  readonly view_count?: number;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  private constructor(props: Board) {
    this.id = props.id;
    this.user_id = props.user_id;
    this.title = props.title?.value;
    this.content = props.content?.value;
    this.view_count = props.view_count;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static from(props: Board): BoardResponse {
    return new BoardResponse(props);
  }
}
