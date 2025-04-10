import { UserOrigin, Users } from "@/common/entitys/users.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserType } from "@/common/decorators/user.decorator";
import { Repository } from "typeorm";
import Result from "@/common/result/Result";

@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    ) { }
    async getHomeConfig(jwtuser: UserType<UserOrigin.Applet>) {
        const userInfo = await this.userRepository.findOne({
            relations: ["template"],
            where: {
                id: jwtuser.id,
                openid: jwtuser.openid,
                origin: jwtuser.origin
            },
        });
        if (!userInfo.template) throw new BadRequestException("模版不存在");
        const { config } = userInfo.template;

        return Result.Success({
            swiper: config.swiper?.map(t => ({
                ...t,
                image: t.image
            })),
            gridBar: config.gridBar?.map(t => ({
                ...t,
                image: t.image
            }))
        })
    }
}