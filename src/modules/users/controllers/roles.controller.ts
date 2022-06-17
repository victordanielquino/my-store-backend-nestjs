import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from '../dtos/roles.dtos';
import { RolesService } from '../services/roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesRepo: RolesService) {}

  @Get()
  getAll() {
    return this.rolesRepo.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'obtener rol por id' })
  getRolById(@Param('id', ParseIntPipe) id: number) {
    return this.rolesRepo.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'crear rol' })
  create(@Body() payload: CreateRoleDto) {
    return this.rolesRepo.create(payload);
  }
}
