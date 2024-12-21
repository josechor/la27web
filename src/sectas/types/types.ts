import { ICustomFile } from "../../shared/services/tuips/types";

export interface ISecta {
    sectaId: number;
    sectaName: string;
    sectaDescription: string;
    sectaPicture: string | null;
    sectaBanner: string | null;
    creatorId: string | null;
    updatedBy: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ISectaCreate {
    sectaName: string;
    sectaDescription: string;
    sectaPicture: ICustomFile | null;
    sectaBanner: string | null;
}

export interface ISectaById extends ISecta {
    followersCount: number;
    tuipsCount: number;
    youFollow: boolean;
}

export interface ISectasFollowed {
    sectaId: number;
    sectaName: string;
}