import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dtos/roles.dtos';

import { Role } from '../entities/role.entity';

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

  async create(data: CreateRoleDto) {
    const newRole = this.roleRepo.create(data);
    return this.roleRepo.save(newRole);
  }
}
