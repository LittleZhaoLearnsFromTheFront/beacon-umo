import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cache } from "cache-manager";
import { ENV } from "../config/config.enum";

export enum RedisDir {
    WX = "wx",
}
@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache, private readonly configService: ConfigService) { }

    async get<T>(dir: RedisDir, key: string): Promise<T | null> {
        const newKey = this.getKey(dir, key);
        return await this.cacheManager.get(newKey);
    }

    async set<T>(dir: RedisDir, key: string, value: T, ttl?: number): Promise<void> {
        const newKey = this.getKey(dir, key);
        await this.cacheManager.set(newKey, value, (ttl || 0) * 1000);
    }

    async del(dir: RedisDir, key: string): Promise<void> {
        const newKey = this.getKey(dir, key);
        await this.cacheManager.del(newKey);
    }

    getKey(dir: RedisDir, key: string) {
        const newKey = this.configService.get<string>(ENV.REDIS_PREFIX) + ":" + dir + ":" + key
        return newKey;
    }
}