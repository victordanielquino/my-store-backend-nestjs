import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { UserRoleInterface } from './intefaces/user-role.interface';
import {
  RoleReadDto,
  UserReadDto,
  UserRoleCreateDto,
  UserRoleReadDto,
} from '../../../core/models/dtos';
import { Role, User, UserRole } from '../../../core/models/entities';

@Injectable()
export class UserRoleService implements UserRoleInterface {
  constructor(
    @InjectRepository(UserRole) private _urRepo: Repository<UserRole>,
    @InjectRepository(User) private _userRepo: Repository<User>,
    @InjectRepository(Role) private _roleRepo: Repository<Role>,
  ) {}

  async getAll(): Promise<UserRoleReadDto[]> {
    const data: UserRole[] = await this._urRepo.find({
      relations: {
        user: true,
        role: true,
      },
    });
    return data.map((item: UserRole) => {
      const user = plainToClass(UserReadDto, item.user, {
        excludeExtraneousValues: true,
      });
      const role = plainToClass(RoleReadDto, item.role, {
        excludeExtraneousValues: true,
      });
      return {
        id: item.id,
        user: user,
        role: role,
      };
    });
  }

  async getOneById(id: number): Promise<UserRoleReadDto> {
    if (!id)
      throw new BadRequestException('debe enviar id de user-role valido');
    const data = await this._urRepo.findOne({
      where: { id },
      relations: { user: true, role: true },
    });
    if (!data)
      throw new NotFoundException(
        `User-Role con id: ${id} not exist or not authorized`,
      );
    const user = plainToClass(UserReadDto, data.user, {
      excludeExtraneousValues: true,
    });
    const role = plainToClass(RoleReadDto, data.role, {
      excludeExtraneousValues: true,
    });
    return {
      id: data.id,
      user,
      role,
    };
  }

  // USER DEL MISMO ROL
  async getAllByRoleId(id: number): Promise<UserReadDto[]> {
    if (!id) throw new BadRequestException('debe enviar id de user valido');
    const data: UserRole[] = await this._urRepo.find({
      relations: {
        user: true,
      },
      where: {
        role: {
          id,
        },
      },
    });
    if (!data || data.length == 0)
      throw new NotFoundException(
        `User-Role: Role con id: ${id} not exist or not authorized`,
      );
    return data.map((item: UserRole) =>
      plainToClass(UserReadDto, item.user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  // ROLES DEL UN USUARIO
  async getAllByUserId(id: number): Promise<RoleReadDto[]> {
    if (!id) throw new BadRequestException('debe enviar id de user valido');
    const data: UserRole[] = await this._urRepo.find({
      relations: {
        role: true,
      },
      where: {
        user: {
          id,
        },
      },
    });
    if (!data || data.length == 0)
      throw new NotFoundException(
        `User-Role: User con id: ${id} not exist or not authorized`,
      );
    return data.map((item) =>
      plainToClass(RoleReadDto, item.role, { excludeExtraneousValues: true }),
    );
  }

  async createOne(data: UserRoleCreateDto): Promise<UserReadDto> {
    const userRole = new UserRole();
    userRole.user = data.user;
    userRole.role = data.role;
    const resp = await this._urRepo.save(userRole);
    const userDto = plainToClass(UserReadDto, resp.user, {
      excludeExtraneousValues: true,
    });
    userDto.roles = [
      plainToClass(RoleReadDto, resp.role, { excludeExtraneousValues: true }),
    ];
    return userDto;
  }

  async deleteByUserId(user: User): Promise<UserRole[]> {
    const resp = await this._urRepo.find({
      relations: { user: true },
      where: { user: { id: user.id } },
    });
    return await this._urRepo.remove(resp);
  }

  async updateByUser(user: User, role: Role): Promise<UserRole[]> {
    const resp = await this._urRepo.find({
      relations: { user: true },
      where: { user: { id: user.id } },
    });
    resp[0].role = role;
    return await this._urRepo.save(resp);
  }
}
