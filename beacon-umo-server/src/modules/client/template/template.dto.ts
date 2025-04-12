import { TemplateConfig } from "@/common/entitys/templates.entity";
import { IsNotEmpty, IsNotEmptyObject, IsNumberString, IsObject, IsString } from "class-validator";

export class getTemplateDto {
    @IsNotEmpty({
        message: 'page 不能为空'
    })
    @IsNumberString({}, {
        message: 'page 必须是数字'
    })
    page: string;

    @IsNotEmpty({
        message: 'limit 不能为空'
    })
    @IsNumberString({}, {
        message: 'limit 必须是数字'
    })
    limit: string;
}

export class createTemplateDto {
    @IsNotEmpty({
        message: '模板名称不能为空'
    })
    @IsString({
        message: '模板名称必须是字符串'
    })
    title: string;

    @IsNotEmptyObject({ nullable: false }, {
        message: '模板配置不能为空'
    })
    @IsObject({
        message: '模板配置必须是对象'
    })
    config: TemplateConfig;

}

export class updateTemplateDto extends createTemplateDto {
}