import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Yape',
      json: true,
      colors: true
    }),
  });
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
