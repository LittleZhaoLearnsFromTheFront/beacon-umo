import { Module } from "@nestjs/common";
import { DefaultService } from "./default.service";
import { DefaultController } from "./default.controller";
import { WXModule } from "../wx/wx.module";

@Module({
    imports: [WXModule],
    providers: [DefaultService],
    controllers: [DefaultController]
})
export class DefaultModule { }