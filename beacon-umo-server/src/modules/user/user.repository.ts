import { Injectable } from "@nestjs/common";
import { CreateUser, EditUser, FindUser } from "./dto/sql.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "@/common/entitys/users.entity";
import { Repository } from "typeorm";
import { sqlWhere } from "@/utils";

@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>
    ) { }

    async findUser(where: FindUser): Promise<Users | null> {
        const user = await this.usersRepository.findOne({
            where: sqlWhere(where)
        })
        return user || null
    }

    async createUser(user: CreateUser): Promise<Users> {
        return await this.usersRepository.save(user)
    }

    async editUser(id: number, user: EditUser) {
        await this.usersRepository.update(id, user)
    }
}