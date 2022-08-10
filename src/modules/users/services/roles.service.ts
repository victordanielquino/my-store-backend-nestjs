import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../../../core/models/entities';
import {
  RoleCreateDto,
  RoleReadDto,
  RoleUpdateDto,
} from '../../../core/models/dtos';
import { RoleInterface } from './intefaces/role.interface';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RolesService implements RoleInterface {
  constructor(@InjectRepository(Role) private _roleRepo: Repository<Role>) {}

  async deleteOne(id: number): Promise<RoleReadDto> {
    const roleExist = await this._roleRepo.findOneBy({ id });
    if (!roleExist) throw new NotFoundException(`ROLE: id:${id} no existe...`);
    const roleDelete = await this._roleRepo.delete(id);
    console.log(roleDelete);
    return plainToClass(RoleReadDto, roleDelete, {
      excludeExtraneousValues: true,
    });
  }

  async getAll(): Promise<RoleReadDto[]> {
    const data = await this._roleRepo.find();
    return data.map((item) =>
      plainToClass(RoleReadDto, item, { excludeExtraneousValues: true }),
    );
  }

  async getOne(id: number): Promise<RoleReadDto> {
    const role = await this._roleRepo.findOneBy({ id: id });
    if (!role) throw new NotFoundException(`ROLE: id:${id} no existe...`);
    return plainToClass(RoleReadDto, role, { excludeExtraneousValues: true });
  }

  async getOneFull(id: number): Promise<Role> {
    const role = await this._roleRepo.findOneBy({ id: id });
    if (!role) throw new NotFoundException(`ROLE: id:${id} no existe...`);
    return role;
  }

  async createOne(payload: RoleCreateDto): Promise<RoleReadDto> {
    try {
      const newRole = this._roleRepo.create(payload);
      return plainToClass(RoleReadDto, await this._roleRepo.save(newRole), {
        excludeExtraneousValues: true,
      });
    } catch (e) {
      console.log('error: ROLE: icreateOne.', e);
      throw new NotFoundException(`error: ROLE: icreateOne`);
    }
  }

  async updateOne(id: number, change: RoleUpdateDto): Promise<RoleReadDto> {
    try {
      const roleExist: Role = await this._roleRepo.findOneBy({ id });
      this._roleRepo.merge(roleExist, change);
      const role = await this._roleRepo.save(roleExist);
      return plainToClass(RoleReadDto, role, { excludeExtraneousValues: true });
    } catch (e) {
      console.log('error: ROLE: updateOne.', e);
      throw new NotFoundException('error: ROLE: updateOne');
    }
  }
}
