import { Tuip, TuipCreate } from "../../types/tuipsTypes";

export interface TuipsApi {
  getTuips(page: number, limit: number): Promise<Tuip[]>;
  createTuip(tuip: TuipCreate): Promise<void>;
  setLike(tuipId: number): Promise<void>;
  removeLike(tuipId: number): Promise<void>;
}
