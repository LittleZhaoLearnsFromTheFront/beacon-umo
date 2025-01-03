import { Module } from "@nestjs/common";
import { WXController } from "./wx.controller";
import { WXService } from "./wx.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "@/common/entitys/users.entity";
import { WXRepository } from "./wx.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    controllers: [
        WXController,
    ],
    providers: [WXService, WXRepository],
})
export class WXModule { }