import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

import { User } from '../../../core/models/entities';
import { ProductsService } from '../../products/services/products.service';
import { CustomersService } from './customers.service';
import { RolesService } from './roles.service';
import { UserInterface } from './intefaces/user.interface';
import {
  RoleReadDto,
  UserAuthReadDto,
  UserCreateDto,
  UserReadDto,
  UserUpdateDto,
} from '../../../core/models/dtos';
import { UserRoleService } from './user-role.service';

@Injectable()
export class UserService implements UserInterface {
  constructor(
    @InjectRepository(User) private _userRepo: Repository<User>,
    private _urService: UserRoleService,
    private productsService: ProductsService,
    private configService: ConfigService,
    private customerService: CustomersService,
    private rolesServices: RolesService,
  ) {}

  async getAll(): Promise<UserReadDto[]> {
    const data: User[] = await this._userRepo.find({
      relations: ['userRoles', 'userRoles.role'],
    });
    return data.map((item: User) => {
      const userDto = plainToClass(UserReadDto, item, {
        excludeExtraneousValues: true,
      });
      userDto.roles = item.userRoles.map((role) =>
        plainToClass(RoleReadDto, role.role, { excludeExtraneousValues: true }),
      );
      return userDto;
    });
  }

  async getOneById(id: number): Promise<UserReadDto> {
    if (!id) throw new BadRequestException('debe enviar id de user valido');
    const user: User = await this._userRepo.findOne({
      where: {
        id: id,
      },
      relations: ['userRoles', 'userRoles.role'],
    });
    if (!user) throw new NotFoundException(`User #${id} not exits.`);
    const userDto = plainToClass(UserReadDto, user, {
      excludeExtraneousValues: true,
    });
    userDto.roles = user.userRoles.map((item) =>
      plainToClass(RoleReadDto, item.role, { excludeExtraneousValues: true }),
    );
    return userDto;
  }

  async getOneByUsername(username: string): Promise<UserAuthReadDto> {
    if (!username)
      throw new BadRequestException('debe enviar username de user valido');
    const data: User = await this._userRepo.findOne({
      where: { username: username },
    });
    if (!data) throw new NotFoundException(`User #${username} not exits.`);

    const roles: RoleReadDto[] = await this._urService.getAllByUserId(data.id);
    if (!roles || roles.length == 0)
      throw new NotFoundException(`User #${username} not asign roles.`);

    const userDto = plainToClass(UserAuthReadDto, data, {
      excludeExtraneousValues: true,
    });
    userDto.roles = roles;
    return userDto;
  }

  async createOne(payload: UserCreateDto): Promise<UserReadDto> {
    const userExist = await this._userRepo.findOneBy({
      username: payload.username,
    });
    if (userExist)
      throw new BadRequestException(
        `User with username: ${payload.username} exist.`,
      );
    const newUser = this._userRepo.create(payload); // se instancia pero no se guarda
    newUser.password = await bcrypt.hash(newUser.password, 10);
    if (payload.customerId) {
      newUser.customer = await this.customerService.findOne(payload.customerId);
    }
    const role = await this.rolesServices.findOne(payload.roleId[0]);
    const user = await this._userRepo.save(newUser);

    return await this._urService.createOne({ user, role });
  }

  async updateOne(id: number, change: UserUpdateDto) {
    const user: User = await this._userRepo.findOneBy({
      id,
    });
    this._userRepo.merge(user, change);
    return this._userRepo.save(user);
  }

  deleteOne(id: number) {
    return this._userRepo.delete(id);
  }

  // ORDERS:
  getOrderByUserId(id: number) {
    const user = this.getOneById(id);
    return {
      date: new Date(),
      user: user,
      products: this.productsService.findAll(),
    };
  }
}
