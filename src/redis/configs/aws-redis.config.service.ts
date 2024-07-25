import type { ConfigService } from '@nestjs/config';

import { BaseRedisConfig } from './base-redis.config.service';

export class AwsRedisConfig extends BaseRedisConfig {
  constructor(configService: ConfigService) {
    super(configService, 'REDIS_HOST', 'REDIS_PORT');
    this.password = configService.get<string>('REDIS_PASSWORD');
    this.tls = {
      checkServerIdentity: () => undefined,
    };
  }

  protected configureTls() {
    return null;
  }
}
