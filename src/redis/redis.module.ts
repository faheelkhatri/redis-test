import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './services/redis.service';
import { RedisConfigFactory } from './factories/redis-config.factory';

@Module({
  exports: [RedisService],
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = RedisConfigFactory.create(configService);
        return redisConfig;
      },
    }),
  ],
  providers: [RedisService],
})
export class RedisModule {}
