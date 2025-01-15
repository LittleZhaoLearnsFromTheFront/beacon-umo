import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CompleteUser } from "./dto/user.dto";
import { UserType } from "@/common/decorators/user.decorator";
import { UserRepository } from "./user.repository";
import Result from "@/common/result/Result";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async completeUser(body: CompleteUser, jwtuser: UserType) {
        const { openid, id } = jwtuser
        const { username, email, avatar } = body
        const user = await this.userRepository.findUser({ openid, id })
        if (!user) throw new BadRequestException("用户不存在")
        if (!username) throw new BadRequestException("用户名不能为空")
        await this.userRepository.editUser(user.id, { username, email, avatar })
        return Result.Success('保存成功')
    }

    async validateTemplate(jwtuser: UserType) {
        const { openid, id } = jwtuser
        const user = await this.userRepository.findUserAndTemplate({ openid, id })
        if (!user) throw new BadRequestException("用户不存在")

        return Result.Success({
            hasTemplate: !!user.template
        })
    }

}