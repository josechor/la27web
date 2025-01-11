import { apiDelete, apiGet, apiPost } from "../../shared/services/api";
import { useUserStore } from "../../shared/stores/user/userStore";
import { ISecta, ISectaById, ISectaCreate } from "../types/types";
import { SectasApi } from "./sectasApi";

export class FetchSectasApi implements SectasApi {
    domain = window.location.href.includes('192.168.1.136') ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_URL;
    userStore = useUserStore();
    async createSecta(secta: ISectaCreate): Promise<void> {
        if (!this.userStore.sessionToken) return;

        const formData = new FormData();
        formData.append("sectaName", secta.sectaName);
        formData.append("sectaDescription", secta.sectaDescription);
        if (secta.sectaPicture) {
            // @ts-ignore
            formData.append("sectaPicture", secta.sectaPicture);
        }

        await fetch(this.domain + "/api/groups", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Demon-Token": this.userStore.sessionToken,
            },
            body: formData,
        });
    }

    async getSectaById(sectaId: number): Promise<ISectaById> {
        return await apiGet<ISectaById>(`/api/groups/${sectaId}`);
    }

    async getSectas(): Promise<ISecta[]> {
        return await apiGet<ISecta[]>('/api/groups');
    }

    async followSecta(sectaId: number): Promise<void> {
        await apiPost(`/api/groups/follow/${sectaId}`, {});
    }

    async unfollowSecta(sectaId: number): Promise<void> {
        await apiDelete(`/api/groups/follow/${sectaId}`, {});
    }
}