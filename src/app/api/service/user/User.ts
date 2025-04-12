export default interface User {
  id: number;
  nickname: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export interface UserProfile extends User {
  id: User["id"];
  nickname: User["nickname"];
  role: User["role"];
  created_at: User["created_at"];
  updated_at: User["updated_at"];
}
