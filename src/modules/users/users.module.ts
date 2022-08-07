import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User, Role, UserRole } from '../../core/models';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user.service';
import { UserRoleService } from './services/user-role.service';
import { UserRoleController } from './controllers/user-role.controller';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './entities';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Order } from './entities';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';
import { OrderItem } from './entities';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([
      User,
      Customer,
      Order,
      OrderItem,
      Role,
      UserRole,
    ]),
  ],
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrderItemController,
    RolesController,
    UserRoleController,
  ],
  providers: [
    UserService,
    CustomersService,
    OrdersService,
    OrderItemService,
    RolesService,
    UserRoleService,
  ],
  exports: [UserService],
})
export class UsersModule {}
