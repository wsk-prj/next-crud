import User from "../user/User";

export interface Board {
  id: number;
  user_id: User["id"];
  title: string;
  content: string;
  view_count: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export interface BoardRequest {
  user_id: User["id"];
  title: Board["title"];
  content: Board["content"];
}

export interface BoardResponse {
  id: Board["id"];
  user_id: User["id"];
  title: Board["title"];
  content: Board["content"];
  view_count: Board["view_count"];
  created_at: Board["created_at"];
  updated_at: Board["updated_at"];
}
