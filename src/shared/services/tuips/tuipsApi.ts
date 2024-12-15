import { Tuip } from "../../types/tuipsTypes";

export interface TuipsApi {
  getTuips(page: number, limit: number): Promise<Tuip[]>;
}
