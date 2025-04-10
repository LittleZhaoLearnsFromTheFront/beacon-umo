import { Module } from "@nestjs/common";
import { TemplateModule } from "./template/template.module";
import { RouterModule } from "@nestjs/core";
import { InfoModule } from "./info/info.module";

@Module({
    imports: [
        RouterModule.register([
            {
                path: 'client',
                module: TemplateModule
            },
            {
                path: 'client',
                module: InfoModule
            }
        ]),
        TemplateModule,
        InfoModule
    ],
    controllers: [],
    providers: [],
})
export class ClientModule { }