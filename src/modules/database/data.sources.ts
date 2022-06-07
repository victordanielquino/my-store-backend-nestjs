import {DataSource, DataSourceOptions} from "typeorm";

const Config: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "12345",
    database: "my_db",
    //entities: [__dirname + '../../**/*.entity.ts'],
    entities: ['src/modules/**/*.entity.ts'],
    //migrations: [__dirname + '/migrations/*.ts'],
    migrations: ['src/modules/database/migrations/*.ts'],
    migrationsTableName: "custom_migration_table",
    /*migrationsRun: true,
    logging: false,
    synchronize: false,*/
}

export const AppDataSource: DataSource = new DataSource(Config);