import { Injectable } from "@nestjs/common";
import { CheckSignatureQuery, isFollowEventMessage, Message } from "./wx.types";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import { ENV } from "../config/config.enum";
import { CacheService } from "../cache/cache.service";
import { WX } from "./wx.enum";
import { WXRepository } from "./wx.repository";
import { Users } from "@/common/entitys/users.entity";
import { SaveUser } from "./dto/wx.dto";
import { generateTextMessage } from "@/utils";

@Injectable()
export class WXService {

    constructor(
        private readonly configService: ConfigService,
        private readonly cacheService: CacheService,
        private readonly wxRepository: WXRepository
    ) { }

    checkSignature(query: CheckSignatureQuery) {
        const { echostr } = query
        return echostr
    }

    async getAccessToken() {
        type ReturnType = {
            expires_in: number,
            access_token: string
        }

        const cacheAccessToken = await this.cacheService.get<string>(WX.Account_Assess_Token)
        if (cacheAccessToken) return cacheAccessToken

        const { data: { access_token, expires_in } } = await axios.get<ReturnType>('https://api.weixin.qq.com/cgi-bin/token', {
            params: {
                grant_type: 'client_credential',
                appid: this.configService.get<string>(ENV.WX_ACCOUNT_APPID),
                secret: this.configService.get<string>(ENV.WX_ACCOUNT_APPSECRET)
            }
        })

        if (cacheAccessToken === access_token) return cacheAccessToken
        await this.cacheService.set(WX.Account_Assess_Token, access_token, expires_in)
        return access_token
    }

    async receiveMessage(message: Message) {
        if (isFollowEventMessage(message.xml)) {
            const { Event, FromUserName } = message.xml
            if (Event[0] === 'subscribe') {
                const user = await this.wxRepository.findUser({ openid: FromUserName[0] })
                if (!user?.openid) {
                    const users: SaveUser = {
                        openid: FromUserName[0],
                    }
                    await this.wxRepository.saveUser(users)
                }
                return generateTextMessage(FromUserName[0], 'Oldbaldness', "欢迎小仙女关注专属的公众号")
            }

        }
    }
}