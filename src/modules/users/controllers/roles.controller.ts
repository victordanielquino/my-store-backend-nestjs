import { Controller, Get } from '@nestjs/common';
import { RolesService } from '../services/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesRepo: RolesService) {}

  @Get()
  getAll() {
    return this.rolesRepo.findAll();
  }
}
