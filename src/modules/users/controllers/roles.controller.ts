import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { RolesService } from '../services/roles.service';
import { RoleCreateDto, RoleUpdateDto } from '../../../core/models/dtos';

@ApiTags('CONTROLLER: ROLE')
@Controller('roles')
export class RolesController {
  constructor(private _roleService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'obtener rol all' })
  async getAll() {
    return {
      message: 'ROLE: getAll',
      data: await this._roleService.getAll(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'obtener rol por id' })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'ROLE: getRolById',
      data: await this._roleService.getOne(id),
    };
  }

  @Post()
  @ApiOperation({ summary: 'crear rol' })
  async createOne(@Body() payload: RoleCreateDto) {
    return {
      message: 'ROLE: createOne',
      data: await this._roleService.createOne(payload),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'crear rol' })
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() change: RoleUpdateDto,
  ) {
    const data = await this._roleService.updateOne(id, change);
    return {
      message: 'ROLE: updateOne',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete rol' })
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this._roleService.deleteOne(id);
    return {
      message: 'ROLE: deleteOne',
      data,
    };
  }
}
