import { Key } from "../../lib/supabase/_supabaseClient";
import { BoardContent } from "./vo/BoardContent";
import { BoardTitle } from "./vo/BoardTitle";

export class Board {
  id?: Key;
  user_id?: Key;
  title?: BoardTitle;
  content?: BoardContent;
  view_count?: number;
  created_at?: Date;
  updated_at?: Date;

  private constructor(props: BoardProps) {
    this.id = props.id;
    this.user_id = props.user_id;
    this.title = props.title;
    this.content = props.content;
    this.view_count = props.view_count;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static from(props: BoardFactoryProps): Board {
    const title = BoardTitle.of(props.title);
    const content = BoardContent.of(props.content);
    return new Board({ ...props, title, content });
  }

  serialize(): object {
    return {
      id: this.id,
      user_id: this.user_id,
      title: this.title?.value,
      content: this.content?.value,
      view_count: this.view_count,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

type BoardProps = {
  id?: Key;
  user_id?: Key;
  title?: BoardTitle;
  content?: BoardContent;
  view_count?: number;
  created_at?: Date;
  updated_at?: Date;
};

type BoardFactoryProps = {
  id?: number;
  user_id?: number;
  title?: string;
  content?: string;
  view_count?: number;
  created_at?: Date;
  updated_at?: Date;
};
