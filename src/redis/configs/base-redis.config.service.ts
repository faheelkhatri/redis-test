import type { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import type { RedisConfigInterface } from '../interfaces/redis-config.interface';

export abstract class BaseRedisConfig implements RedisConfigInterface {
  host: string;
  port: number;
  store: typeof redisStore;
  password?: string;
  tls?: {
    ca?: Buffer[];
    checkServerIdentity?: () => undefined;
  };

  constructor(configService: ConfigService, hostKey: string, portKey: string) {
    this.host = configService.get<string>(hostKey, 'localhost');
    this.port = configService.get<number>(portKey, 6379);
    this.store = redisStore;
  }

  protected abstract configureTls(): Promise<Partial<{ ca: Buffer[] }>>;
}
