export interface TuipInterface {
    tuipId: number;
    tuipContent: string;
    tuipMultimedia: string[];
    tuipCreatedAt: string;
    demonId: string;
    userName: string;
    demonName: string;
    magradaCount: number;
    youLiked: boolean;
    quoting: null | number;
    secta: null | number;
    parent: null | number;
    profilePicture: null | string;
}

export interface TuipCreate {
    content: string;
    multimedia: File[];
    quoting: null | number;
    secta: null | number;
    parent: null | number
}

export interface TuipFilters {
    authorId?: string;
    likedById?: string;
}