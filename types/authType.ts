export interface User {
  id: number;
  name: string;
  email: string;
  img?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}