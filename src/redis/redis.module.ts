import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './services/redis.service';
import { RedisConfigFactory } from './factories/redis-config.factory';
import { GcpModule } from 'src/gcp/gcp.module';
import { GcpSecretService } from 'src/gcp/services/gcp-secret.service';

@Module({
  exports: [RedisService],
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule, GcpModule],
      inject: [ConfigService, GcpSecretService],
      useFactory: async (
        configService: ConfigService,
        gcpSecretService: GcpSecretService,
      ) => {
        const redisConfig = RedisConfigFactory.create(
          configService,
          gcpSecretService,
        );
        return redisConfig;
      },
    }),
  ],
  providers: [RedisService],
})
export class RedisModule {}
