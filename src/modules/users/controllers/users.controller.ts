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
import {ApiOperation, ApiTags} from "@nestjs/swagger";

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

@ApiTags('users') // SWAGGER: AGRUPAR APIS POR TITULO
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @Get()
  @ApiOperation({summary: 'Lista de Usuarios!!'})  // SWAGGER: Documentacion por end-point
  @HttpCode(HttpStatus.ACCEPTED)
  getUsersAll(@Query('limit') limit = 0, @Query('offset') offset = 0) {
    return this.userService.findAll();
  }

  @Get('tasks')
  getTasks() {
    return this.userService.getTasks();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  getUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(userId, payload);
  }

  @Delete(':userId')
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.remove(userId);
  }

  // ORDERS:
  /*@Get(':userId/orders')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getOrderByUserId(userId);
  }*/
}