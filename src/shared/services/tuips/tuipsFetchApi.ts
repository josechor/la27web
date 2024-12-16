import { TuipInterface, TuipCreate, TuipFilters } from "../../types/tuipsTypes";
import { apiDelete, apiGet, apiPost } from "../api";
import { TuipsApi } from "./tuipsApi";

export class TuipsFetchApi implements TuipsApi {
  async getTuips(page: number, limit: number, filters?:  TuipFilters): Promise<TuipInterface[]> {
    let query = ""
    if(filters && filters.authorId) {
      	query += `&authorId=${filters.authorId}`
    }
    if(filters && filters.likedById) {
      	query += `&likedById=${filters.likedById}`
    }
    return await apiGet<TuipInterface[]>(`/api/tuips?page=${page}&limit=${limit}${query}`);
  }
  async createTuip(tuip: TuipCreate): Promise<void> {
    await apiPost("/api/tuips", tuip);
  }
  async setLike(tuipId: number): Promise<void> {
    await apiPost(`/api/tuips/like/${tuipId}`, {});
  }
  async removeLike(tuipId: number): Promise<void> {
    await apiDelete(`/api/tuips/like/${tuipId}`, {});
  }
}
