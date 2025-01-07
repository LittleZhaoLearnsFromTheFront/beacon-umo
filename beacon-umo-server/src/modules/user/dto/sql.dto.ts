import { Users } from "@/common/entitys/users.entity";

export type FindUser = {
    id?: string;
    openid?: string
    username?: string;
}

export type CreateUser = Partial<Omit<Users, 'id'>>

export type EditUser = {
    username: string,
    email?: string,
    avatar?: string,
}