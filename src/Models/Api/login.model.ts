export interface Login {
  email: string;
  user_password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
  nick_name: string;
}
