import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "@/common/entitys/users.entity";
import { Templates } from "@/common/entitys/templates.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users, Templates])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository]
})
export class UserModule { }