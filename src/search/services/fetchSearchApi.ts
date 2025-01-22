import { apiGet } from "../../shared/services/api";
import { ISearchUsers } from "../types/types";

export class FetchSearchApi {
    async getAllUsers(): Promise<ISearchUsers[]> {
        const response = await apiGet<ISearchUsers[]>("/api/users/getAllUsers");
        return response;
    }
}