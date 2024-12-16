export interface Tuip {
    tuipId: number;
    tuipContent: string;
    tuipMultimedia: null | string;
    tuipCreatedAt: string;
    demonId: string;
    userName: string;
    demonName: string;
    magradaCount: number;
    youLiked: boolean;
}

export interface TuipCreate {
    content: string;
    multimedia: null | string;
}

export interface TuipFilters {
    authorId?: string;
    likedById?: string;
}