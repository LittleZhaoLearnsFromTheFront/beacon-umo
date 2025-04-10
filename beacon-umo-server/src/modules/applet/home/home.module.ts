import { Templates } from "@/common/entitys/templates.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeService } from "./home.service";
import { HomeController } from "./home.controller";
import { Users } from "@/common/entitys/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users,Templates])],
    providers: [HomeService],
    controllers: [HomeController]
})
export class HomeModule { }