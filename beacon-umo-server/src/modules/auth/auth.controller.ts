import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import Result from "@/common/result/Result";
import { Public } from "@/common/metadata/public.metadata";

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @HttpCode(200)
    @Post('login')
    async login(@Body() body: LoginDto) {
        return await this.authService.login(body);

    }

}