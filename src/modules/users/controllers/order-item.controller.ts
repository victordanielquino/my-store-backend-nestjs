import { Body, Controller, Post } from '@nestjs/common';

import { OrderItemService } from '../services/order-item.service';
import { CreateOrderItemDto } from '../../../core/models/dtos/order-item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CONTROLLER: ORDER-ITEM') // SWAGGER: AGRUPAR APIS POR TITULO
@Controller('order-item')
export class OrderItemController {
  constructor(private itemServices: OrderItemService) {}
  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemServices.create(payload);
  }
}
