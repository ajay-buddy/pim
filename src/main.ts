import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initAdapters } from './app/adapters.init';
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     logger: true,
//   });
//   app.enableCors();
//   app.useWebSocketAdapter(new RedisIoAdapter(app));
//   await app.listen(process.env.SERVER_PORT);
// }
// bootstrap();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  initAdapters(app);

  await app.listen(3000, () => {
    console.log(`Listening on port 3000.`);
  });
}

bootstrap();
