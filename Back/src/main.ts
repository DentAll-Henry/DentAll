import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './config/environment';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(json());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(environment.port);
}
bootstrap();
