export interface Tuip {
    tuipId: number;
    tuipContent: string;
    tuipMultimedia: null | string;
    tuipCreatedAt: string;
    demonId: string;
    userName: string;
    demonName: string;
    magrada: boolean;
}

export interface TuipCreate {
    content: string;
    multimedia: null | string;
}