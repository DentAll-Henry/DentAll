import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './config/environment';
import { ValidationPipe } from '@nestjs/common';
<<<<<<< HEAD

import * as cors from 'cors';
import { json } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const version = require('../package.json').version;
=======
import * as cors from 'cors';
import { json } from 'express';
>>>>>>> 4571e18e (CRUD dentalServ)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(json());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

<<<<<<< HEAD
  const swaggerConfig = new DocumentBuilder()
    .setTitle('DentAll')
    .setDescription('')
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

=======
>>>>>>> 4571e18e (CRUD dentalServ)
  await app.listen(environment.port);
}
bootstrap();
