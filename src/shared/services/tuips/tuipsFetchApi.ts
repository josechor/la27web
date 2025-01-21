import { useUserStore } from "../../stores/user/userStore";
import { TuipInterface, TuipCreate, TuipFilters } from "../../types/tuipsTypes";
import { apiDelete, apiGet, apiPost } from "../api";
import { TuipsApi } from "./tuipsApi";

export class TuipsFetchApi implements TuipsApi {
  domain = window.location.href.includes('192.168.1.136') ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_URL_PROD;
  async getTuipById(tuipId: number): Promise<TuipInterface> {
    const tuip = await apiGet<TuipInterface>(`/api/tuips/${tuipId}`);
    tuip.tuipMultimedia = (tuip.tuipMultimedia as any) !== "" ? (tuip.tuipMultimedia as any).split(",") : []
    return tuip;
  }

  async getTuips(page: number, limit: number, filters?: TuipFilters): Promise<TuipInterface[]> {
    let query = ""
    if (filters && filters.authorId) {
      query += `&authorId=${filters.authorId}`
    }
    if (filters && filters.likedById) {
      query += `&likedById=${filters.likedById}`
    }
    if (filters && filters.sectaId) {
      query += `&sectaId=${filters.sectaId}`
    }
    const response = await apiGet<TuipInterface[]>(`/api/tuips?page=${page}&limit=${limit}${query}`);
    response.forEach((tuip) => {
      if (tuip.tuipMultimedia === null) {
        tuip.tuipMultimedia = []
      }
    });
    return response;
  }

  async createTuip(tuip: TuipCreate): Promise<void> {
    const userStore = useUserStore();
    const formData = new FormData();
    if (!userStore.sessionToken) return;

    formData.append("content", tuip.content);
    tuip.multimedia.forEach((fileObj) => {
      // @ts-ignore
      formData.append("media", fileObj.file);
    });
    if (tuip.quoting) {
      formData.append("quoting", tuip.quoting?.toString() || "");
    }
    if (tuip.secta) {
      formData.append("secta", tuip.secta?.toString() || "");
    }
    if (tuip.parent) {
      formData.append("parent", tuip.parent?.toString() || "");
    }
    await fetch(this.domain + "/api/tuips", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Demon-Token": userStore.sessionToken,
      },
      body: formData,
    });
  }

  async setLike(tuipId: number): Promise<void> {
    await apiPost(`/api/tuips/like/${tuipId}`, {});
  }

  async removeLike(tuipId: number): Promise<void> {
    await apiDelete(`/api/tuips/like/${tuipId}`, {});
  }
}
