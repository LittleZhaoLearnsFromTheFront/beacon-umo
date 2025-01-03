import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cache } from "cache-manager";
import { ENV } from "../config/config.enum";

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache, private readonly configService: ConfigService) { }

    async get<T>(key: string): Promise<T | null> {
        const newKey = this.getKey(key);
        return await this.cacheManager.get(newKey);
    }

    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
        const newKey = this.getKey(key);
        await this.cacheManager.set(newKey, value, ttl);
    }

    async del(key: string): Promise<void> {
        const newKey = this.getKey(key);
        await this.cacheManager.del(newKey);
    }

    getKey(key: string) {
        const newKey = this.configService.get<string>(ENV.REDIS_PREFIX) + "::" + key
        return newKey;
    }
}