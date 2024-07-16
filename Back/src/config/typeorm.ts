import { DataSource, DataSourceOptions } from 'typeorm';
import { environment } from './environment';
import { registerAs } from '@nestjs/config';

const config = {
  type: 'postgres',
  database: environment.bdInfo.name,
  host: environment.bdInfo.host,
  port: environment.bdInfo.port,
  username: environment.bdInfo.username,
  password: environment.bdInfo.pass,
  // dropSchema: true,
  // synchronize: true,
  // logging: true,
  ssl: true,
  autoLoadEntities: true,
  timezone: 'localtime',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  // migrationsTableName: 'migrations_typeorm',
  // migrationsRun: true,
};
export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
