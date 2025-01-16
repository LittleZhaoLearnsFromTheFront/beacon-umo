import { Injectable } from "@nestjs/common";
import { CheckSignatureQuery, isFollowEventMessage, Message } from "./wx.types";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import { ENV } from "../config/config.enum";
import { CacheService } from "../cache/cache.service";
import { WXRepository } from "./wx.repository";
import { SaveUser } from "./dto/wx.dto";
import { generateTextMessage } from "@/utils";
import { RedisDir, RedisKey } from "../cache/cache.enum";

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

    async getAccountAccessToken() {
        type ReturnType = {
            expires_in: number,
            access_token: string
        }

        const cacheAccessToken = await this.cacheService.get<string>(RedisDir.WX, RedisKey.WX_Account_Access_Token)
        if (cacheAccessToken) return cacheAccessToken

        const { data: { access_token, expires_in } } = await axios.get<ReturnType>('https://api.weixin.qq.com/cgi-bin/token', {
            params: {
                grant_type: 'client_credential',
                appid: this.configService.get<string>(ENV.WX_ACCOUNT_APPID),
                secret: this.configService.get<string>(ENV.WX_ACCOUNT_APPSECRET)
            }
        })

        await this.cacheService.set(RedisDir.WX, RedisKey.WX_Account_Access_Token, access_token, expires_in)
        return access_token
    }

    async getAppletAccessToken() {
        type ReturnType = {
            expires_in: number,
            access_token: string
        }

        const cacheAccessToken = await this.cacheService.get<string>(RedisDir.WX, RedisKey.WX_Applet_Access_Token)
        if (cacheAccessToken) return cacheAccessToken

        const { data: { access_token, expires_in } } = await axios.get<ReturnType>('https://api.weixin.qq.com/cgi-bin/token', {
            params: {
                grant_type: 'client_credential',
                appid: this.configService.get<string>(ENV.WX_APPLET_APPID),
                secret: this.configService.get<string>(ENV.WX_APPLET_APPSECRET)
            }
        })

        if (cacheAccessToken === access_token) return cacheAccessToken
        await this.cacheService.set(RedisDir.WX, RedisKey.WX_Applet_Access_Token, access_token, expires_in)
        return access_token
    }
}