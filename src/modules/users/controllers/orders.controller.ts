import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { OrdersService } from '../services/orders.service';
import { ParseIntPipe } from '../../../common/parse-int.pipe';
import { OrderCreateDto, OrderUpdateDto } from '../../../core/models/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CONTROLLER: ORDER') // SWAGGER: AGRUPAR APIS POR TITULO
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() payload: OrderCreateDto) {
    return this.ordersService.create(payload);
  }

  @Put()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: OrderUpdateDto,
  ) {
    return this.ordersService.update(id, payload);
  }

  @Delete()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
