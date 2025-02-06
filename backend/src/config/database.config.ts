import {DataSourceOptions} from 'typeorm'

export const databaseConfig: DataSourceOptions = {
  type: "mysql",
  driver: require("mysql2"),
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'ultra-quest',
  synchronize: false,
  dropSchema: false,
  logging: true,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
}
