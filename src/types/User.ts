export interface User {
  id: string;
  loginid: string;
  loginpw: string;
}

export interface RegisterDTO {
  loginid: string;
  loginpw: string;
}

export interface LoginDTO {
  loginid: string;
  loginpw: string;
}
