import type { ConfigService } from '@nestjs/config';

import { BaseRedisConfig } from './base-redis.config.service';

export class LocalRedisConfig extends BaseRedisConfig {
  constructor(configService: ConfigService) {
    super(configService, 'REDIS_HOST', 'REDIS_PORT');
  }

  protected configureTls() {
    return null;
  }
}
