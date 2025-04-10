import { Controller, Module } from "@nestjs/common";
import { TemplateController } from "./template.controller";
import { TemplateService } from "./template.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Templates } from "@/common/entitys/templates.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Templates])],
    controllers: [TemplateController],
    providers: [TemplateService],

})
export class TemplateModule { }