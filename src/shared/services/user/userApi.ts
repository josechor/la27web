import { CreateUser, User } from "../../types/userTypes";

export interface UserApi {
  getUser(userId: number): Promise<string>;
  createUser(user: CreateUser): Promise<void>;
  authUser(email: string, password: string): Promise<{ token: string }>;
  getUserData(): Promise<User>;
}
