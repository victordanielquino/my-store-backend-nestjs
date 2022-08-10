import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from '../services/user.service';
import { UserCreateDto, UserUpdateDto } from '../../../core/models/dtos';

@ApiTags('CONTROLLER: USER') // SWAGGER: AGRUPAR APIS POR TITULO
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Lista de Usuarios!!' }) // SWAGGER: Documentacion por end-point
  @HttpCode(HttpStatus.ACCEPTED)
  async getAll(@Query('limit') limit = 0, @Query('offset') offset = 0) {
    return {
      message: 'getAll: Users',
      data: await this.userService.getAll(),
    };
  }

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  async getOne(@Param('userId', ParseIntPipe) userId: number) {
    return {
      message: 'USER: getOne',
      data: await this.userService.getOneById(userId),
    };
  }

  @Post()
  async create(@Body() payload: UserCreateDto) {
    const data = await this.userService.createOne(payload);
    return {
      message: 'USER: createOne',
      data,
    };
  }

  @Put(':userId')
  async updateOne(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UserUpdateDto,
  ) {
    const data = await this.userService.updateOne(userId, payload);
    return {
      message: 'USER: updateOne',
      data,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.deleteOne(id);
    return {
      message: 'USER: deleteOne',
      data,
    };
  }
}
