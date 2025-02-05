import { BadRequestException, Injectable } from "@nestjs/common";
import axios from "axios";
import { WXService } from "../wx/wx.service";
import { CacheService } from "../../common_modules/cache/cache.service";
import { RedisDir, RedisKey } from "../../common_modules/cache/cache.enum";
import Result from "@/common/result/Result";

@Injectable()
export class DefaultService {
    constructor(
        private readonly wxService: WXService,
        private readonly cacheService: CacheService
    ) { }

    /**
     * 废弃，个人公众号无法获取带参数二维码
     * @returns 
     */
    async loginQrcode() {
        const oldTicket = await this.cacheService.get<string>(RedisDir.WX, RedisKey.WX_Ticket_Login)
        if (oldTicket) {
            const data = await this.getLoginQrCode(oldTicket)
            return Result.Success(data)
        }
        const accessToken = await this.wxService.getAccountAccessToken()
        const { data: { errcode, errmsg, ticket, expire_seconds } } = await axios.post<{ expire_seconds: number, ticket: string, errcode: number, errmsg: string }>(`https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${accessToken}`, {
            data: {
                expire_seconds: 60 * 60 * 24,
                action_name: 'QR_STR_SCENE',
                action_info: { scene: { scene_str: "login" } }
            }
        })
        if (!ticket) throw new BadRequestException("获取二维码失败")
        await this.cacheService.set(RedisDir.WX, RedisKey.WX_Ticket_Login, ticket, expire_seconds)
        return Result.Success(await this.getLoginQrCode(ticket))
    }

    async getLoginQrCode(ticket: string) {
        try {
            const { data } = await axios.get(`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`)
            return data
        } catch {
            throw new BadRequestException("获取二维码失败")
        }
    }
}