import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { GcpModule } from './gcp/gcp.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RedisModule, GcpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
