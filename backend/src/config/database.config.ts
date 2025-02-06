import { DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'demande-rh',
  synchronize: false,
  dropSchema: false,
  entities: ['**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
};