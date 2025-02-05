import { BadRequestException, Injectable } from "@nestjs/common";
import { ClientLoginDto, ClientRegisterDto, LoginDto } from "./dto/index.dto";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { ENV } from "../../common_modules/config/config.enum";
import { UserRepository } from "../user/user.repository";
import { JwtService } from "@nestjs/jwt";
import Result from "@/common/result/Result";
import { UserOrigin } from "@/common/entitys/users.entity";
import * as bcrypt from "bcrypt";
import { validateEmail } from "@/utils";
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

        const { data: { errcode, openid } } = await axios.get<Result>('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                appid: this.configService.get<string>(ENV.WX_APPLET_APPID),
                secret: this.configService.get<string>(ENV.WX_APPLET_APPSECRET),
                js_code: code,
                grant_type: 'authorization_code'
            }
        })


        if (errcode === 40029) throw new BadRequestException('code无效')
        if (errcode === 45011 || errcode === 40226 || errcode === -1) throw new BadRequestException('请求失败')

        let user = await this.userRepository.findUser({ openid, origin: UserOrigin.Applet })

        if (!user) {
            const params = {
                openid
            }
            user = await this.userRepository.createUser(params)
        }

        const payload = { sub: user.id, openid: user.openid, origin: UserOrigin.Applet }
        return Result.Success({
            token: this.jwtService.sign(payload),
            needComplete: !user?.username
        })
    }

    async clientLogin(body: ClientLoginDto) {
        const { email, password } = body
        const user = await this.userRepository.findUser({ email, origin: UserOrigin.Client })
        if (!user) throw new BadRequestException('用户不存在')
        //TODO 没有真正注册的用户
        const isMatch = password == user.password || bcrypt.compareSync(password, user.password)
        if (!isMatch) throw new BadRequestException('密码错误')
        const payload = { sub: user.id, email: user.email, origin: UserOrigin.Client }
        return Result.Success({
            token: this.jwtService.sign(payload)
        })
    }

    async clientRegister(body: ClientRegisterDto) {
        const { email, password } = body
        if (!validateEmail(email)) throw new BadRequestException('邮箱格式不正确')
        if (password.length < 6) throw new BadRequestException('密码长度至少为6位')
        const user = await this.userRepository.findUser({ email, origin: UserOrigin.Client })
        if (user) throw new BadRequestException('用户已存在')

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        await this.userRepository.createUser({
            username: email,
            email,
            password: hash,
            origin: UserOrigin.Client
        })

        return Result.Success('注册成功')
    }
}