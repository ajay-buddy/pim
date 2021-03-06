import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number): any {
    const server = super.createIOServer(port);
    const redisAdapter = redisIoAdapter({
      host: process.env.REDIS_HOST || 'redisnotification',
      port: parseInt(process.env.REDIS_PORT) || 6379,
    });
    server.adapter(redisAdapter);
    return server;
  }
}
