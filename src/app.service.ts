import { Inject, Injectable } from '@nestjs/common';
import { Client } from "pg";
import { ConfigService, ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    @Inject('PG') private clientPG: Client,
    @Inject(config.KEY) private configEnv: ConfigType<typeof config>,
    //@Inject('API_KEY') private apiKey: string,
    //private config: ConfigService,
  ) {}

  getHello(): string {
    const apiKey = this.configEnv.apiKey;
    const dbName = this.configEnv.database.name;
    //console.log('tasks:', this.tasks);
    return `Hello World! ${apiKey} ${dbName}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        // console.error(err);
        // console.log(res.rows);
        resolve(res.rows);
      })
    })
  }
}