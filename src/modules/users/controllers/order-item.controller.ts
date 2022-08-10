import { Body, Controller, Post } from '@nestjs/common';

import { OrderItemService } from '../services/order-item.service';
import { OrderItemCreateDto } from '../../../core/models/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CONTROLLER: ORDER-ITEM') // SWAGGER: AGRUPAR APIS POR TITULO
@Controller('order-item')
export class OrderItemController {
  constructor(private itemServices: OrderItemService) {}
  @Post()
  create(@Body() payload: OrderItemCreateDto) {
    return this.itemServices.create(payload);
  }
}
