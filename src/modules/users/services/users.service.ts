import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { ProductsService } from '../../products/services/products.service';
import { CustomersService } from './customers.service';
import { RolesService } from './roles.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customerService: CustomersService,
    private rolesServices: RolesService,
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['customer', 'role'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: id,
      },
      relations: { role: true },
    });
    if (!user) throw new NotFoundException(`User #${id} not exits.`);
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email: email },
      relations: { role: true },
    });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data); // se instancia pero no se guarda
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    const role = await this.rolesServices.findOne(data.roleId);
    newUser.role = role;
    return this.userRepo.save(newUser);
  }

  async update(id: number, change: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepo.merge(user, change);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  // ORDERS:
  getOrderByUserId(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user: user,
      products: this.productsService.findAll(),
    };
  }
}
