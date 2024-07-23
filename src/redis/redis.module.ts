import * as fs from 'fs';
import * as path from 'path';

import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './services/redis.service';

export const EXCLUDED_ENVIRONMENT_FOR_ELASTICACHE = ['local', 'test'];

@Module({
  exports: [RedisService],
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        host: '10.55.210.3',
        store: redisStore,
        ...(!EXCLUDED_ENVIRONMENT_FOR_ELASTICACHE.includes('development') && {
          password: '1adb062f-6227-41f5-9a12-49ebca041031',
        }),
        port: 6378,
        ...(!EXCLUDED_ENVIRONMENT_FOR_ELASTICACHE.includes('development') && {
          tls: {
            ca: [
              fs.readFileSync(
                // path.join(__dirname, '../../../../../Downloads/server-ca.pem'),
                //working below
                // path.join(__dirname, ' ../../../../../Downloads/server-ca.pem'),
                path.join(__dirname, '../assets/server-ca.pem'),
              ),
            ],
            checkServerIdentity: () => undefined,
          },
        }),
      }),
    }),
  ],
  providers: [RedisService],
})
export class RedisModule {}
