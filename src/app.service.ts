import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/services/redis.service';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async setKey(key: string, value: string, ttl: number) {
    await this.redisService.setCache(key, value, ttl);
  }

  async getKey(key: string) {
    return this.redisService.getCache(key);
  }
}
