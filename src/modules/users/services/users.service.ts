import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) //@Inject('API_KEY') private apiKey: string
  {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'User 1',
      lastName: 'Quino',
      phone: '12345',
    },
  ];

  // METHODS:
  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return this.users;
  }
  findById(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user)
      throw new NotFoundException(`findById: el user con id: #${id} not found`);
    return user;
  }
  create(payload: CreateUserDto) {
    //console.log('payload:', payload);
    this.counterId++;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, payload: UpdateUserDto) {
    const user = this.findById(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    }
    return null;
  }
  remove(id: number) {
    const user = this.findById(id);
    if (!user)
      throw new NotFoundException(`remove: the user with id: #${id} not found`);
    this.users = this.users.filter((items) => items.id !== id);
    return true;
  }

  // ORDERS:
  getOrderByUserId(id: number) {
    const user = this.findById(id);
    return {
      date: new Date(),
      user: user,
      products: this.productsService.findAll(),
    };
  }
}
