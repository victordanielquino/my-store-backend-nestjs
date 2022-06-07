import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Delete} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

import {CategoriesService} from "../services/categories.service";
import {ParseIntPipe} from "../../../common/parse-int.pipe";
import {CreateCategoryDto, UpdateCategoryDto} from "../dtos/categories.dtos";

@ApiTags('categories') // SWAGGER: AGRUPAR APIS POR TITULO
@Controller('categories')
export class CategoriesController {

  constructor(private categoriesService: CategoriesService) {
  }

  @Get()
  @ApiOperation({summary: 'Lista de Categories'})
  @HttpCode(HttpStatus.ACCEPTED)
  getAll() {
    return this.categoriesService.findAll();
  }

  //@Get(':categoryId/products/:productId')
  @Get(':id')
  getById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() payload: UpdateCategoryDto
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
