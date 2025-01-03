import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import Result from "@/common/result/Result";

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }
    
    @HttpCode(200)
    @Post('login')
    async login(@Body() body: LoginDto) {
        const { token } = await this.authService.login(body);
        return Result.Success({
            token
        })
    }

}