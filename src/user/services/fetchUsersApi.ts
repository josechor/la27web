import { apiPatch } from "../../shared/services/api";
import { useUserStore } from "../../shared/stores/user/userStore";

export class FetchUsersApi {
    domain = window.location.href.includes('192.168.1') ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_URL_PROD;

    async updateProfilePicture(file: File): Promise<void> {
        const userStore = useUserStore();
        const formData = new FormData();
        if (!userStore.sessionToken) return;

        // @ts-ignore
        formData.append("profilePicture", file.file);
        await fetch(this.domain + "/api/users/update/picture", {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Demon-Token": userStore.sessionToken,
            },
            body: formData,
        });
    }

    async updateBanner(file: File): Promise<void> {
        const userStore = useUserStore();
        const formData = new FormData();
        if (!userStore.sessionToken) return;

        // @ts-ignore
        formData.append("banner", file.file);
        await fetch(this.domain + "/api/users/update/banner", {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Demon-Token": userStore.sessionToken,
            },
            body: formData,
        });
    }

    async updateProfile(userData: any): Promise<void> {
        await apiPatch("/api/users/update", userData);
    }
}
