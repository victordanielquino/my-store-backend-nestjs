import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {Order} from "../entities/order.entity";
import {Customer} from "../entities/customer.entity";
import {CreateOrderDto, UpdateOrderDto} from "../dtos/order.dto";

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    ) {
    }

    findAll() {
        return this.orderRepo.find();
    }

    async findOne(id: number) {
        const order = await this.orderRepo.findOne({
            where: {id: id},
            relations: {
                items: {
                    product: true
                },
                customer: true,
            }
        });

        if (!order) throw new NotFoundException('not found');
        return order;
    }

    async create(data: CreateOrderDto) {
        const newOrder = new Order();
        if (data.customerId) {
            const customer = await this.customerRepo.findOneBy({id: data.customerId});
            newOrder.customer = customer;
        }
        return this.orderRepo.save(newOrder);
    }

    async update(id: number, change: UpdateOrderDto) {
        const order = await this.orderRepo.findOneBy({id: id});
        if (change.customerId) {
            const customer = await this.customerRepo.findOneBy({id: change.customerId});
            order.customer = customer;
        }
        return this.orderRepo.save(order);
    }

    remove(id: number) {
        return this.orderRepo.delete(id);
    }
}
