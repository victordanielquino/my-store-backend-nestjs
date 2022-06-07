import { Global, Module } from '@nestjs/common';
import {Client} from "pg";
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../../config';

const API_KEY = '12345';
const API_KEY_PROD = 'prod12345';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configEnv: ConfigType<typeof config>) => {
        const { dbPort, dbPass, dbName, dbHost, dbUser } = configEnv.postgres;
        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPass,
          database: dbName,
          synchronize: false,  // para que la base de datos se sincronize conforme se creen las tablas
          autoLoadEntities: true, // sincronizar con las entidades creadas
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      //useValue: client,
      useFactory: (configEnv: ConfigType<typeof config>) => {
        const client = new Client({
          user: configEnv.postgres.dbUser,
          host: configEnv.postgres.dbHost,
          database: configEnv.postgres.dbName,
          password: configEnv.postgres.dbPass,
          port: configEnv.postgres.dbPort,
        })
        client.connect();
        return client;
      },
      inject: [config.KEY]
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
