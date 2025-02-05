import { Global, Module } from "@nestjs/common";
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule as DefaultCacheModule } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { ENV } from "../config/config.enum";
import { CacheService } from "./cache.service";

@Global()
@Module({
    imports: [
        DefaultCacheModule.registerAsync({
            useFactory: async (config: ConfigService) => {
                const store = await redisStore({
                    socket: {
                        host: config.get(ENV.REDIS_HOST),
                        port: config.get(ENV.REDIS_PORT),
                    },
                })
                return {
                    store,
                    
                }
            },
            inject: [ConfigService]
        })
    ],
    providers: [CacheService],
    exports: [CacheService]
})
export class CacheModule { }