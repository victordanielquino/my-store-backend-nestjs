import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { CustomersController } from "./controllers/customers.controller";
import { CustomersService } from './services/customers.service';
import { Customer } from "./entities/customer.entity";
import { Order } from "./entities/order.entity";
import { OrderItem } from "./entities/order-item.entity";

import { ProductsModule } from '../products/products.module';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemService } from './services/order-item.service';
import { OrderItemController } from './controllers/order-item.controller';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer, Order, OrderItem])],
  controllers: [UsersController, CustomersController, OrdersController, OrderItemController],
  providers: [UsersService, CustomersService, OrdersService, OrderItemService],
})
export class UsersModule {}
