import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getCategory() {
    return `welcome controller categories`;
  }

  @Get(':categoryId/products/:productId')
  getCategoryP(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return `product ${productId}, category ${categoryId}`;
  }

  @Post()
  create(@Body() payload: any) {
    return { message: 'action create categories:', payload };
  }
}
