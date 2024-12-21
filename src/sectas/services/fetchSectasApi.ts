import { apiGet, apiPost } from "../../shared/services/api";
import { ISecta, ISectaCreate } from "../types/types";
import { SectasApi } from "./sectasApi";

export class FetchSectasApi implements SectasApi {
    async createSecta(secta: ISectaCreate): Promise<void> {
        await apiPost('/api/groups', secta);
    }

    async getSectaById(sectaId: number): Promise<ISecta> {
        return await apiGet<ISecta>(`/api/groups/${sectaId}`);
    }

    async getSectas(): Promise<ISecta[]> {
        return await apiGet<ISecta[]>('/api/groups');
    }
}