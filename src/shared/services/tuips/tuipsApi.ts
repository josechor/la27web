import { Tuip, TuipCreate } from "../../types/tuipsTypes";

export interface TuipsApi {
  getTuips(page: number, limit: number): Promise<Tuip[]>;
  createTuip(tuip: TuipCreate): Promise<void>;
}
