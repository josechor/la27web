import { CreateUser, User } from "../../types/userTypes";
import { apiGet } from "../api";
import { UserApi } from "./userApi";

export class UserFetchApi implements UserApi {
  domain = import.meta.env.VITE_API_URL;
  async createUser(user: CreateUser): Promise<void> {
    await fetch(this.domain + "/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }

  async authUser(email: string, password: string): Promise<{ token: string }> {
      const response = await fetch(this.domain + "/api/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }

  async getUser(userId: number): Promise<string> {
    const response = await fetch(`/api/user/${userId}`);
    return response.json();
  }

  async getUserData(): Promise<User> {
    const response = await apiGet<User>("/api/users/userData");
    return response;
  }
}
