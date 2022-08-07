import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserRoleService } from '../services/user-role.service';
import { RoleReadDto, UserReadDto, UserRoleReadDto } from '../../../core/dtos';

@Controller('user-role')
export class UserRoleController {
  constructor(private _urService: UserRoleService) {}

  @Get()
  async getAll() {
    const data = await this._urService.getAll();
    return {
      message: 'USER ROLE: getAll()',
      data,
    };
  }

  @Get(':id')
  async getOneById(@Param('id', ParseIntPipe) id: number) {
    const data: UserRoleReadDto = await this._urService.getOneById(id);
    return {
      message: 'USER-ROLE: getOneById',
      data,
    };
  }

  @Get('user/:id')
  async getOneByUserId(@Param('id', ParseIntPipe) id: number) {
    const data: RoleReadDto[] = await this._urService.getAllByUserId(id);
    return {
      message: 'USER-ROLE: getOneByUserId',
      data,
    };
  }

  @Get('role/:id')
  async getOneByRoleId(@Param('id', ParseIntPipe) id: number) {
    const data: UserReadDto[] = await this._urService.getAllByRoleId(id);
    return {
      message: 'USER-ROLE: getOneByRoleId',
      data,
    };
  }
}
