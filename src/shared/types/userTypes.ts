export interface CreateUser {
  user_name: string;
  demon_name: string;
  email: string;
  password: string;
}

export interface LoggedUser {
  id: number;
  token: string;
}
