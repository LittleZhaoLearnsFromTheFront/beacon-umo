import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'code不能为空' })
    @IsString()
    code: string
}