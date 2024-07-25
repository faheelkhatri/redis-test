import type { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

import { BaseRedisConfig } from './base-redis.config.service';
import { GcpSecretService } from 'src/gcp/services/gcp-secret.service';

export class GcpRedisConfig extends BaseRedisConfig {
  constructor(
    configService: ConfigService,
    private readonly gcpSecretService: GcpSecretService,
  ) {
    super(configService, 'REDIS_HOST', 'REDIS_PORT');
    this.password = configService.get<string>('REDIS_PASSWORD');
    this.tls = {
      checkServerIdentity: () => undefined,
      ...this.configureTls(),
    };
  }

  protected async configureTls() {
    const certificate = await this.gcpSecretService.getSecret(
      'stage-redis-certificate',
    );
    // console.log( certificate );
    // console.log(
    //   fs.readFileSync(path.join(__dirname, '../../assets/server-ca.pem')),
    // );
    console.log(
      fs.readFileSync(path.join(__dirname, '../../assets/server-ca.pem')),
    );
    console.log(Buffer.from(certificate, 'utf-8'));
    return {
      ca: [fs.readFileSync(path.join(__dirname, '../../assets/server-ca.pem'))],
    };
  }
}
