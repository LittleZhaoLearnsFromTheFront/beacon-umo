import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ENV } from "../config/config.enum";
import { resolve } from "path"
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                type: config.get<'mysql'>(ENV.DB_TYPE),
                host: config.get<string>(ENV.DB_HOST),
                port: config.get<number>(ENV.DB_PORT),
                username: config.get<string>(ENV.DB_USERNAME),
                password: config.get<string>(ENV.DB_PASSWORD),
                database: config.get<string>(ENV.DB_DATABASE),
                synchronize: config.get<boolean>(ENV.DB_SYNC),
                entities: [resolve(__dirname, "../../common/entitys/*.entity{.ts,.js}")],
                migrations: [resolve(__dirname, "../../migrations/**/*{.ts,.js}")],
                cli: {
                    migrationsDir: resolve(__dirname, "../../migrations"),
                    entitiesDir: resolve(__dirname, "../../common/entitys")
                },
            }),
            inject: [ConfigService]
        })
    ]
})
export class DBModule { }