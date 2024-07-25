import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GcpSecretService } from './gcp/services/gcp-secret.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly gcpSecretService: GcpSecretService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('set')
  async setKey(@Body() body: { key: string; value: string; ttl: number }) {
    const { key, value, ttl } = body;
    await this.appService.setKey(key, value, ttl);
    return { message: 'Value set successfully' };
  }

  @Get('get/:key')
  async getKey(@Param('key') key: string) {
    const value = await this.appService.getKey(key);
    return { key, value };
  }

  @Get('secret')
  testGcpSecretService() {
    return this.gcpSecretService.getSecret('stage-redis-certificate');
  }
}
