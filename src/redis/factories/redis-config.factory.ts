import type { ConfigService } from '@nestjs/config';

import { AwsRedisConfig } from '../configs/aws-redis.config.service';
import { GcpRedisConfig } from '../configs/gcp-redis.config.service';
import { LocalRedisConfig } from '../configs/local-redis.config.service';
import type { RedisConfigInterface } from '../interfaces/redis-config.interface';
import { GcpSecretService } from 'src/gcp/services/gcp-secret.service';
const EXCLUDED_ENVIRONMENT_FOR_ELASTICACHE = ['local', 'test'];

export class RedisConfigFactory {
  static async create(
    configService: ConfigService,
    gcpSecretService: GcpSecretService,
  ): Promise<RedisConfigInterface> {
    const isElastiCacheEnabled = EXCLUDED_ENVIRONMENT_FOR_ELASTICACHE.includes(
      configService.get<string>('NODE_ENV'),
    );
    const provider = configService.get<string>('REDIS_PROVIDER');

    if (isElastiCacheEnabled) {
      return new LocalRedisConfig(configService);
    } else if (provider === 'AWS') {
      return new AwsRedisConfig(configService);
    } else if (provider === 'GCP') {
      const gcpRedisConfig = new GcpRedisConfig(
        configService,
        gcpSecretService,
      );
      await gcpRedisConfig.initialize();
      return gcpRedisConfig;
    }
    throw new Error('Unsupported Redis Provider');
  }
}
