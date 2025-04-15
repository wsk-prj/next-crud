import { Key } from "../../lib/supabase/_supabaseClient";
import { CommentContent } from "./vo/CommentContent";

export class Comment {
  id?: Key;
  board_id?: Key;
  user_id?: Key;
  parent_id?: Key;
  content?: CommentContent;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;

  private constructor(props: CommentProps) {
    this.id = props.id;
    this.board_id = props.board_id;
    this.user_id = props.user_id;
    this.content = props.content;
    this.parent_id = props.parent_id;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
    this.is_deleted = props.is_deleted;
  }

  static from(props: CommentFactoryProps): Comment {
    const content = CommentContent.of(props.content);
    return new Comment({ ...props, content });
  }

  serialize(): object {
    return {
      id: this.id,
      board_id: this.board_id,
      user_id: this.user_id,
      content: this.content?.value,
      parent_id: this.parent_id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      is_deleted: this.is_deleted,
    };
  }
}

type CommentProps = {
  id?: Key;
  board_id?: Key;
  user_id?: Key;
  parent_id?: Key;
  content?: CommentContent;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;
};

type CommentFactoryProps = {
  id?: number;
  board_id?: number;
  user_id?: number;
  parent_id?: number;
  content?: string;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;
};
