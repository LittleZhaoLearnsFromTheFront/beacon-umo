import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as fs from 'fs/promises'; // 导入 Node.js 文件系统模块 (Promise-based)
import * as path from 'path'; // 导入 Node.js 路径处理模块
import { WXService } from "../wx/wx.service";
import { CacheService } from "../../common_modules/cache/cache.service";
import { RedisDir, RedisKey } from "../../common_modules/cache/cache.enum";
import Result from "@/common/result/Result";
import axios from "axios";
import { Config } from "@/config";
import { ConfigService } from "@nestjs/config";
import { ENV } from "@/common_modules/config/config.enum";
import { staticUrl } from "@/utils";
import { v4 } from "uuid";

const UPLOAD_DIR = Config.upload.path

@Injectable()
export class DefaultService {
    constructor(
        // WXService 和 CacheService 可能不再需要，除非此 Service 还有其他依赖它们的方法
        private readonly wxService: WXService,
        private readonly cacheService: CacheService,
        private readonly configService: ConfigService
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

    /**
     * 接收上传的文件并保存到服务器本地
     * @param type 文件类型 (可选, 用于子目录分类)
     * @param file Express.Multer.File 对象, 包含文件信息和 buffer
     * @returns Result 包含保存后的文件信息 (如路径)
     */
    async uploadFile(type: string, file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException("未接收到上传文件");
        }

        if (!type) throw new BadRequestException("类型不能为空")

        try {
            const targetDir = path.join(UPLOAD_DIR, type)
            await fs.mkdir(targetDir, { recursive: true });
            const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
            const ext = path.extname(sanitizedOriginalName)
            const uniqueFilename = `${Date.now()}-${v4()}${ext}`;
            const filePath = path.join(targetDir, uniqueFilename);

            await fs.writeFile(filePath, file.buffer);

            const url = this.configService.get(ENV.STATIC_URL) + staticUrl + "/" + type + "/" + uniqueFilename
            return Result.Success({
                url,
                name: file.originalname,
                hashName: uniqueFilename
            });

        } catch (error) {
            console.error("保存文件时出错:", error);
            throw new InternalServerErrorException("文件保存失败");
        }
    }
}