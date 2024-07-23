import type * as redisStore from 'cache-manager-redis-store';

export interface RedisConfigInterface {
  host: string;
  password?: string;
  port: number;
  store: typeof redisStore;
  tls?: {
    ca?: Buffer[];
    checkServerIdentity?: () => undefined;
  };
}
