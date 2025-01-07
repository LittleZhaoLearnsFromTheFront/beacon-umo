import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CompleteUser {
    @IsNotEmpty({ message: "username必填" })
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    avatar: string;

}