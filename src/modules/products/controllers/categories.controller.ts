import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from '../services/categories.service';
import { ParseIntPipe } from '../../../common/parse-int.pipe';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/modules/auth/Models/roles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('categories') // SWAGGER: AGRUPAR APIS POR TITULO
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Lista de Categories' })
  @HttpCode(HttpStatus.ACCEPTED)
  getAll() {
    return this.categoriesService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
