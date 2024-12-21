import { ISecta, ISectaCreate } from "../types/types";

export interface SectasApi {
    getSectas(): Promise<ISecta[]>;
    getSectaById(sectaId: number): Promise<ISecta>;
    createSecta(secta: ISectaCreate): Promise<void>;
}