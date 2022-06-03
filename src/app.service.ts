import { Inject, Injectable } from '@nestjs/common';

import { ConfigService, ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    //@Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    //private config: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    //console.log('tasks:', this.tasks);
    return `Hello World! ${apiKey} ${dbName}`;
  }
}