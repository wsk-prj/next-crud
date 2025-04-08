export default interface User {
  id: number;
  loginid: string;
  loginpw: string;
  createdAt: Date;
  updatedAt: Date;
  nickname: string;
  role: string;
}

export interface RegisterDTO {
  loginid: string;
  loginpw: string;
  nickname: string;
}

export interface LoginDTO {
  loginid: string;
  loginpw: string;
}
