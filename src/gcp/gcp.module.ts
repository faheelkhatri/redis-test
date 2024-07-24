import { Module } from '@nestjs/common';

import { GcpSecretService } from './services/gcp-secret.service';

@Module({
  exports: [GcpSecretService],
  providers: [GcpSecretService],
})
export class GcpModule {}
