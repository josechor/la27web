import { CreateUser } from "../../types/userTypes";
import { UserApi } from "./userApi";

export class UserFetchApi implements UserApi {
    async getUser(userId: number): Promise<string> {
        const response = await fetch(`/api/user/${userId}`);
        return response.json();
    }

    async createUser(user: CreateUser): Promise<void> {
        await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    }
}