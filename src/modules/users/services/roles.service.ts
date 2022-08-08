import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../../../core/models';
import { RoleCreateDto } from '../../../core/dtos';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  findAll() {
    return this.roleRepo.find();
  }

  async findOne(id: number) {
    const role = this.roleRepo.findOneBy({ id: id });
    if (!role) throw new NotFoundException(`ROLE: id:${id} no existe...`);
    return role;
  }

  async create(data: RoleCreateDto) {
    const newRole = this.roleRepo.create(data);
    return this.roleRepo.save(newRole);
  }
}
