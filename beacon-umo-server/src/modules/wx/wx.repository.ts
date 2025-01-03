import { Users } from "@/common/entitys/users.entity";
import { sqlWhere } from "@/utils";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FindUserParams, SaveUser } from "./dto/wx.dto";


@Injectable()
export class WXRepository {

    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>
    ) { }

    async findUser(params: FindUserParams) {
        const { id, openid } = params;
        const user = await this.usersRepository.findOne({
            where: sqlWhere({ id, openid })
        })
        return user
    }

    async saveUser(user: SaveUser) {
        const oldUser = await this.findUser({ openid: user.openid })
        if (oldUser) {
            return oldUser
        }
        const newUser = await this.usersRepository.save(user)
        return newUser
    }

}