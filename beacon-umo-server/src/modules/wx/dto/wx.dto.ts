export type SaveUser = {
    openid: string;
    username?: string;
    password?: string;
    email?: string;
    avatar?: string;
}
export type FindUserParams = {
    id?: number;
    openid?: string
}