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
import { UserCreateDto, UserUpdateDto } from '../../../core/dtos';

@ApiTags('CONTROLLER: USER') // SWAGGER: AGRUPAR APIS POR TITULO
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Lista de Usuarios!!' }) // SWAGGER: Documentacion por end-point
  @HttpCode(HttpStatus.ACCEPTED)
  getUsersAll(@Query('limit') limit = 0, @Query('offset') offset = 0) {
    return this.userService.getAll();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  getUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getOneById(userId);
  }

  @Post()
  create(@Body() payload: UserCreateDto) {
    return this.userService.createOne(payload);
  }

  @Put(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UserUpdateDto,
  ) {
    return this.userService.updateOne(userId, payload);
  }

  @Delete(':userId')
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteOne(userId);
  }
}
