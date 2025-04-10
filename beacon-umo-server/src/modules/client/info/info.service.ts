import { UserType } from "@/common/decorators/user.decorator";
import { UserOrigin } from "@/common/entitys/users.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../../user/user.repository";
import Result from "@/common/result/Result";

@Injectable()
export class InfoService {

    constructor(private readonly userRepository: UserRepository) { }

    async info(jwtUser: UserType<UserOrigin.Client>) {
        const { id, email, origin } = jwtUser;
        const user = await this.userRepository.findUser({ id, email, origin })
        if (!user) throw new BadRequestException('用户不存在')
        return Result.Success({
            isLogin: true,
            username: user.username,
            avatar: user.avatar,
            email: user.email
        })
    }
}