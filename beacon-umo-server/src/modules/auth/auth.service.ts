import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { ENV } from "../config/config.enum";
import { UserRepository } from "../user/user.repository";
import { JwtService } from "@nestjs/jwt";
import Result from "@/common/result/Result";

@Injectable()
export class AuthService {

    constructor(
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async login(body: LoginDto) {
        const { code } = body

        type Result = {
            session_key: string;
            errcode: number;
            openid: string;
        }

        const { data: { session_key, errcode, openid }, status } = await axios.get<Result>('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                appid: this.configService.get<string>(ENV.WX_APPLET_APPID),
                secret: this.configService.get<string>(ENV.WX_APPLET_APPSECRET),
                js_code: code,
                grant_type: 'authorization_code'
            }
        })


        if (errcode === 40029) throw new BadRequestException('code无效')
        if (errcode === 45011 || errcode === 40226 || errcode === -1) throw new BadRequestException('请求失败')

        let user = await this.userRepository.findUser({ openid })

        if (!user) {
            const params = {
                openid
            }
            user = await this.userRepository.createUser(params)
        }

        const payload = { sub: user.id, openid: user.openid }
        return Result.Success({
            token: this.jwtService.sign(payload),
            needComplete: !user?.username
        })
    }

    async validateUser(id: number, openid: string) {
        return await this.userRepository.findUser({ id, openid })
    }
}