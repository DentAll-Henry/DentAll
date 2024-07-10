import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './config/environment';
import { ValidationPipe } from '@nestjs/common';

import * as cors from 'cors';
import { json } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
const version = require('../package.json').version;

async function bootstrap() {

  const httpsOptions = {
    key: readFileSync('certs/server.key'),
    cert: readFileSync('certs/server.cert'),
  };


  const app = await NestFactory.create(AppModule, {  });
  app.use(cors());
  app.use(json());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('DentAll')
    .setDescription('<p>Esta es la documentación correspondiente a la API DentAll, una app propuesta para facilitar la gestión de centros odontológicos, centralizando en un mismo lugar todas las funcionalidades que se requieren para un óptimo funcionamiento de este tipo de empresas. </p><p>Se tiene implementada funcionalidad para:<ul><li>Registro y autenticación de usuarios.</li><li>CRUD de usuarios: <ul><li>Pacientes.</li><li>Dentistas.</li><li>Personal de apoyo administrativo.</li></ul></li><li>CRUD de productos.</li><li>CRUD de servicios.</li><li>CRUD de citas.</li><li>CRUD de record dental.</li><li>CRUD de sedes.</li></ul></p><p><strong>Importante:</strong></p><ul><li>Al iniciar la app se realiza una validación respecto a si existe o no información en la base de datos y se hará una precarga para poder hacer pruebas. Si ya hay información no se realizará la precarga.</li><li>Algunas funcionalidades solo podrán ser realizada por un super admin de la plataforma: <ul><li>Asignar y eliminar rol de dentista.</li><li>Asignar y eliminar rol de personal de apoyo administrativo.</li><li>Asignar y eliminar rol de super admin.</li></ul></li></ul>')
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

  await app.listen(environment.port);
}
bootstrap();
