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
    sectaPicture: string | null;
    sectaBanner: string | null;
}