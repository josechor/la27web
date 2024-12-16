import { TuipInterface, TuipCreate, TuipFilters } from "../../types/tuipsTypes";

export interface TuipsApi {
  getTuips(page: number, limit: number, filters?: TuipFilters): Promise<TuipInterface[]>;
  createTuip(tuip: TuipCreate): Promise<void>;
  setLike(tuipId: number): Promise<void>;
  removeLike(tuipId: number): Promise<void>;
}
