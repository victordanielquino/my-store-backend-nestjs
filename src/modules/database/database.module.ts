import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../../config/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configEnv: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          url: configEnv.postgresUrl,
          ssl: {
            rejectUnauthorized: false,
          },
          synchronize: false, // para que la base de datos se sincronize conforme se creen las entities
          autoLoadEntities: true, // sincronizar con las entidades creadas
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
