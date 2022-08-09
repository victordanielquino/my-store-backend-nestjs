import { DataSource, DataSourceOptions } from 'typeorm';

const Config: DataSourceOptions = {
  type: 'postgres',
  /*host: 'localhost',
  port: 5432,
  username: 'store',
  password: 'store',
  database: 'dbstore',*/
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
  entities: ['src/core/models/entities/*.entity.ts'],
  migrations: ['src/modules/database/migrations/*.ts'],
  migrationsTableName: 'custom_migration_table',
};

export const AppDataSource: DataSource = new DataSource(Config);
