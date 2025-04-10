import { UserType } from "@/common/decorators/user.decorator";
import { UserOrigin, Users } from "@/common/entitys/users.entity";
import { Injectable } from "@nestjs/common";
import { createTemplateDto, getTemplateDto } from "./template.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Templates } from "@/common/entitys/templates.entity";
import { Repository } from "typeorm";
import Result from "@/common/result/Result";

@Injectable()
export class TemplateService {

    constructor(@InjectRepository(Templates) private readonly templateRepository: Repository<Templates>) { }

    async getTemplate(query: getTemplateDto, user: UserType<UserOrigin.Client>) {
        const { page, limit } = query;
        const [templates, total] = await this.templateRepository.findAndCount({
            where: {
                client_user: user
            },
            skip: (Number(limit) - 1) * Number(page),
            take: Number(page),
            order: {
                create_time: 'DESC'
            }
        })
        return Result.Success({
            list: templates || [],
            total
        })
    }

    async createTemplate(body: createTemplateDto, user: UserType<UserOrigin.Client>) {
        const { title, config } = body;
        const template = new Templates();
        template.title = title;
        template.config = config;
        template.client_user = user as Users;
        await this.templateRepository.save(template);
        return Result.Success('创建成功');
    }
}
