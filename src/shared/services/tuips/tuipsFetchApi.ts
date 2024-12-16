import { Tuip, TuipCreate } from "../../types/tuipsTypes";
import { apiDelete, apiGet, apiPost } from "../api";
import { TuipsApi } from "./tuipsApi";

export class TuipsFetchApi implements TuipsApi {
  async getTuips(page: number, limit: number): Promise<Tuip[]> {
    return await apiGet<any>(`/api/tuips?page=${page}&limit=${limit}`);
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
