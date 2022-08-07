import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserRoleInterface } from './intefaces/user-role.interface';
import { RoleReadDto, UserReadDto, UserRoleReadDto } from '../../../core/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../../../core/models';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserRoleService implements UserRoleInterface {
  constructor(
    @InjectRepository(UserRole) private _urRepo: Repository<UserRole>,
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
}
