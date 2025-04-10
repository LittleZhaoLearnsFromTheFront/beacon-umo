import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { TemplateService } from "./template.service";
import { createTemplateDto, getTemplateDto } from "./template.dto";
import { User, UserType } from "@/common/decorators/user.decorator";
import { UserOrigin } from "@/common/entitys/users.entity";

@Controller('template')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) { }

    @Get()
    async getTemplate(@Query() query: getTemplateDto, @User() user: UserType<UserOrigin.Client>) {
        return this.templateService.getTemplate(query, user);
    }


    @Post()
    async createTemplate(@Body() body: createTemplateDto, @User() user: UserType<UserOrigin.Client>) {
        return this.templateService.createTemplate(body, user);
    }


}