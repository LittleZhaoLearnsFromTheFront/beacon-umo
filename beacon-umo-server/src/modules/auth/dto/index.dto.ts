import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'code不能为空' })
    @IsString()
    code: string
}

export class ClientLoginDto {
    @IsNotEmpty({ message: "用户名不能为空" })
    @IsString()
    email: string

    @IsNotEmpty({ message: "密码不能为空" })
    @IsString()
    password: string
}

export class ClientRegisterDto extends ClientLoginDto {
    
}