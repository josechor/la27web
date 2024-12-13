export interface CreateUser {
    name: string;
    email: string;
}

export interface LoggedUser {
    id: number;
    token: string;
}