import { Module } from "@nestjs/common";
import { InfoService } from "./info.service";
import { InfoController } from "./info.controller";
import { UserModule } from "../user/user.module";

@Module({
    imports: [UserModule],
    providers: [InfoService],
    controllers: [InfoController]
})
export class InfoModule { }