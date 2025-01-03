import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { WXService } from "./wx.service";
import { CheckSignatureQuery, Message } from "./wx.types";

@Controller('wx')
export class WXController {

    constructor(private readonly wxService: WXService) { }

    @Get('message')
    checkSignature(@Query() query: CheckSignatureQuery) {
        return this.wxService.checkSignature(query);
    }

    @Post('message')
    async receiveMessage(@Body() body: Message) {
        return await this.wxService.receiveMessage(body);
    }

    getAccountAccessToken() {
        return this.wxService.getAccountAccessToken();
    }

}