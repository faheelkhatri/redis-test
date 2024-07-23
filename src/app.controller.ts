import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('set')
  async setKey(@Body() body: { key: string; value: string }) {
    const { key, value } = body;
    await this.appService.setKey(key, value);
    return { message: 'Value set successfully' };
  }

  @Get('get/:key')
  async getKey(@Param('key') key: string) {
    const value = await this.appService.getKey(key);
    return { key, value };
  }
}
