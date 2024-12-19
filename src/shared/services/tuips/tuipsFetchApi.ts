import { useUserStore } from "../../stores/user/userStore";
import { TuipInterface, TuipCreate, TuipFilters } from "../../types/tuipsTypes";
import { apiDelete, apiGet, apiPost } from "../api";
import { TuipsApi } from "./tuipsApi";

export class TuipsFetchApi implements TuipsApi {
  domain = import.meta.env.VITE_API_URL;
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
    const response = await apiGet<TuipInterface[]>(`/api/tuips?page=${page}&limit=${limit}${query}`);
    response.forEach((tuip) => {

      tuip.tuipMultimedia = (tuip.tuipMultimedia as any) !== "" ? (tuip.tuipMultimedia as any).split(",") : []
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
      formData.append("multimedia", fileObj.file);
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
