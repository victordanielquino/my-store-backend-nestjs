import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from "pg";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { ProductsService } from '../../products/services/products.service';
import {CreateProductDto, UpdateProductDto} from "../../products/dtos/products.dtos";
import {CustomersService} from "./customers.service";

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPG: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customerService: CustomersService
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id:number) {
    const user = await this.userRepo.findOneBy({id:id});
    if (!user) throw new NotFoundException(`User #${id} not exits.`);
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data); // se instancia pero no se guarda
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
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

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      })
    })
  }
  // METHODS:
  /*findAll() {
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

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      })
    })
  }*/
}
