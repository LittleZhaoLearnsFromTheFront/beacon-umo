import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import Result from "@/common/result/Result";
import { Public } from "@/common/metadata/public.metadata";
import { JwtGuard } from "@/common/guard/jwt.guard";

@UseGuards(JwtGuard)
@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @HttpCode(200)
    @Post('login')
    async login(@Body() body: LoginDto) {
        const { token } = await this.authService.login(body);
        return Result.Success({
            token
        })
    }

}