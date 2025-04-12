import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { TemplateService } from "./template.service";
import { createTemplateDto, getTemplateDto, updateTemplateDto } from "./template.dto";
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

    @Put(':id')
    async updateTemplate(@Param('id') id: string, @Body() body: updateTemplateDto, @User() user: UserType<UserOrigin.Client>) {
        return this.templateService.updateTemplate(id, body, user);
    }

    @Delete(':id')
    async deleteTemplate(@Param('id') id: string, @User() user: UserType<UserOrigin.Client>) {
        return this.templateService.deleteTemplate(id, user);
    }


}