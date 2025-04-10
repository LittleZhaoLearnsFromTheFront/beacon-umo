import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { HomeModule } from "./home/home.module";

@Module({
    imports: [
        RouterModule.register([
            {
                path: 'applet',
                module: HomeModule
            }
        ]),
        HomeModule
    ],
    controllers: [],
    providers: [],
})
export class AppletModule { }