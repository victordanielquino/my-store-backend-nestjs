import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany, JoinColumn
} from 'typeorm';

import {Customer} from "./customer.entity";
import {OrderItem} from "./order-item.entity";

@Entity({name: 'orders'})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'create_at',
    type:'timestamptz',
    default:() => 'CURRENT_TIMESTAMP'
  })
  createAt:Date;

  @UpdateDateColumn({
    name: 'update_at',
    type:'timestamptz',
    default:() => 'CURRENT_TIMESTAMP'
  })
  updateAt:Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({name: 'customer_id'})
  customer: Customer;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[]
}
