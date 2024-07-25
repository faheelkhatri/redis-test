import type { ConfigService } from '@nestjs/config';

import { BaseRedisConfig } from './base-redis.config.service';
import { GcpSecretService } from 'src/gcp/services/gcp-secret.service';

export class GcpRedisConfig extends BaseRedisConfig {
  constructor(
    private readonly configService: ConfigService,
    private readonly gcpSecretService: GcpSecretService,
  ) {
    super(configService, 'REDIS_HOST', 'REDIS_PORT');
    this.password = configService.get<string>('REDIS_PASSWORD');
  }

  async initialize() {
    const tlsConfig = await this.configureTls();
    this.tls = {
      checkServerIdentity: () => undefined,
      ...tlsConfig,
    };
  }

  protected async configureTls() {
    const environment = this.configService.get<string>('NODE_ENV');
    console.log(environment);
    const caCertificate = await this.gcpSecretService.getSecret(
      'stage-redis-certificate',
    );
    console.log(Buffer.from(caCertificate, 'utf-8'));
    return {
      ca: [Buffer.from(caCertificate, 'utf-8')],
    };
  }
}
