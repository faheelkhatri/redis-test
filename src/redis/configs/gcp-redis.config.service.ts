import type { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

import { BaseRedisConfig } from './base-redis.config.service';

export class GcpRedisConfig extends BaseRedisConfig {
  constructor(configService: ConfigService) {
    super(configService, 'REDIS_HOST', 'REDIS_PORT');
    this.password = configService.get<string>('REDIS_PASSWORD');
    this.tls = {
      checkServerIdentity: () => undefined,
      ...this.configureTls(),
    };
  }

  protected configureTls() {
    console.log(
      fs.readFileSync(path.join(__dirname, '../../assets/server-ca.pem')),
    );
    return {
      ca: [fs.readFileSync(path.join(__dirname, '../../assets/server-ca.pem'))],
    };
  }
}
