import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      dbUser: process.env.POSTGRES_USER,
      dbPass: process.env.POSTGRES_PASSWORD,
      dbPort: parseInt(process.env.POSTGRES_PORT),
      dbHost: process.env.POSTGRES_HOST,
    },
    /*typeORM: {
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: process.env.TYPEORM_ENTITIES,
      synchronize: process.env.TYPEORM_SYNCHRONIZE,
      logging: process.env.TYPEORM_LOGGING,

      migrations: process.env.POSTGRES_HOST,
    },*/
    apiKey: process.env.API_KEY,
  };
});
