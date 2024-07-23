import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async getCache<T>(key: string): Promise<T> {
    return this.cacheService.get(key);
  }

  async setCache<T>(key: string, value: T, ttl: number): Promise<void> {
    await this.cacheService.set(key, value, ttl);
  }
}
