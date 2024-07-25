import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GcpSecretService {
  constructor(private readonly configService: ConfigService) {}

  async getSecret(secretName: string) {
    const client = new SecretManagerServiceClient();

    const gcpProjectId = this.configService.get<string>('GCP_PROJECT_ID');

    const [version] = await client.accessSecretVersion({
      name: `projects/${gcpProjectId}/secrets/${secretName}/versions/latest`,
    });

    return version.payload.data.toString();
  }
}
