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
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../../core/models/dtos/category.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RoleEnum } from '../../../core/enums';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('categories') // SWAGGER: AGRUPAR APIS POR TITULO
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Roles(RoleEnum.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Lista de Categories' })
  @HttpCode(HttpStatus.ACCEPTED)
  getAll() {
    return this.categoriesService.findAll();
  }

  @Roles(RoleEnum.ADMIN)
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Roles(RoleEnum.ADMIN)
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Roles(RoleEnum.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
