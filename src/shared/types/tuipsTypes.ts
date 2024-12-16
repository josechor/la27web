export interface TuipInterface {
    tuipId: number;
    tuipContent: string;
    tuipMultimedia: null | string;
    tuipCreatedAt: string;
    demonId: string;
    userName: string;
    demonName: string;
    magradaCount: number;
    youLiked: boolean;
    quoting: null | number;
    secta: null | number;
    parent: null | number;
}

export interface TuipCreate {
    content: string;
    multimedia: null | string;
    quoting: null | number;
    secta: null | number;
    parent: null | number
}

export interface TuipFilters {
    authorId?: string;
    likedById?: string;
}