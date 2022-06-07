import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    //return 'hola daniel quino';
    return this.appService.getHello();
  }

  @Get('nuevo')
  newEndPoint(): string {
    return 'soy el nuevo end point';
  }

  @Get('/ruta/')
  newEndPointRuta(): string {
    return 'soy la nueva ruta';
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
