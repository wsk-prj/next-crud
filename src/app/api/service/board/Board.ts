export interface Board {
  id: number;
  user_id: number;
  title: string;
  content: string;
  view_count: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}
