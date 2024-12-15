import { Tuip } from "../../types/tuipsTypes";
import { apiGet } from "../api";
import { TuipsApi } from "./tuipsApi";

export class TuipsFetchApi implements TuipsApi {
  async getTuips(page: number, limit: number): Promise<Tuip[]> {
    return await apiGet<any>(`/api/tuips?page=${page}&limit=${limit}`);
  }
}
