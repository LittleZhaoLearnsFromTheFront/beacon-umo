import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ClientLoginDto, ClientRegisterDto, LoginDto } from "./dto/index.dto";
import { Public } from "@/common/metadata/public.metadata";
import { HttpStatus } from "@/common/constant/HttpStatus";

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @HttpCode(HttpStatus.SUCCESS)
    @Post('login')
    async login(@Body() body: LoginDto) {
        return await this.authService.login(body);
    }

    @Public()
    @HttpCode(HttpStatus.SUCCESS)
    @Post('client-login')
    async clientLogin(@Body() body: ClientLoginDto) {
        return await this.authService.clientLogin(body);
    }

    @Public()
    @HttpCode(HttpStatus.SUCCESS)
    @Post('client-register')
    async clientRegister(@Body() body: ClientRegisterDto) {
        return await this.authService.clientRegister(body);
    }
}