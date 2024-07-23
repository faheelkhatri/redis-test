import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly logger = new Logger(RedisService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async onModuleInit() {
    try {
      // Attempt a connection to the Redis server by performing a simple operation
      await this.cacheService.set('connectionTest', 'success');
      const result = await this.cacheService.get('connectionTest');

      if (result === 'success') {
        this.logger.log('Redis connection successful');
      } else {
        this.logger.error('Redis connection test failed');
      }
    } catch (error) {
      this.logger.error('Redis connection unsuccessful', error.message);
    }
  }

  async getCache<T>(key: string): Promise<T> {
    return this.cacheService.get(key);
  }

  async setCache<T>(key: string, value: T, ttl: number): Promise<void> {
    await this.cacheService.set(key, value, ttl);
  }
}
