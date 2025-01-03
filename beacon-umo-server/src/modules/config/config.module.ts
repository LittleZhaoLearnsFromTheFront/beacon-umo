import { Global, Module } from "@nestjs/common";
import { ConfigModule as DefaultConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { ENV } from "./config.enum";
import { isDev } from "src/utils/system";

const filePath = ['.env', isDev ? '.env.development' : '.env.production']

@Global()
@Module({
    imports: [
        DefaultConfigModule.forRoot({
            isGlobal: true,
            envFilePath: filePath,
            validationSchema: Joi.object({
                [ENV.DB_TYPE]: Joi.string().valid('mysql').required(),
                [ENV.DB_HOST]: Joi.string().required(),
                [ENV.DB_PORT]: Joi.number().port().required(),
                [ENV.DB_USERNAME]: Joi.string().required(),
                [ENV.DB_PASSWORD]: Joi.string().required(),
                [ENV.DB_DATABASE]: Joi.string().required(),
                [ENV.DB_SYNC]: Joi.boolean().default(false),
                [ENV.REDIS_HOST]: Joi.string().required(),
                [ENV.REDIS_PORT]: Joi.number().port().required(),
                [ENV.REDIS_PASSWORD]: Joi.string().allow(''),
                [ENV.REDIS_PREFIX]: Joi.string().required(),
                [ENV.WX_ACCOUNT_APPID]: Joi.string().required(),
                [ENV.WX_ACCOUNT_APPSECRET]: Joi.string().required(),
            })
        })
    ],
    controllers: [],
    providers: [],
    exports: [ConfigModule]
})
export class ConfigModule { }