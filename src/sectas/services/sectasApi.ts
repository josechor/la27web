import { ISecta, ISectaById, ISectaCreate } from "../types/types";

export interface SectasApi {
    getSectas(): Promise<ISecta[]>;
    getSectaById(sectaId: number): Promise<ISectaById>;
    createSecta(secta: ISectaCreate): Promise<void>;
    followSecta(sectaId: number): Promise<void>;
    unfollowSecta(sectaId: number): Promise<void>;
}