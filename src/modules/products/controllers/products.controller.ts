import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

import { ParseIntPipe } from '../../../common/parse-int.pipe';
import { ProductsService } from '../services/products.service';
import {CreateProductDto, FilterProductDto, UpdateProductDto} from '../dtos/products.dtos';

@ApiTags('products') // AGRUPAR APIS CON SWAGGER
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  /*@Get()
  getProduct() {
    return `welcome controller product`;
  }*/
  // PARAMETERS:
  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({summary: 'Lista od products'})
  getProductsAll(@Query() params: FilterProductDto) {
    return this.productService.findAll(params);
  }
  /*@Get(':id')
  getProductById(@Param() params: any) {
    return `product with id: ${params.id}`;
  }*/
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProductById(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findOne(productId);
  }

  //   @Get('products_/:id')
  //   getProduct_(@Param('id') id: string) {
  //     return `product ${id}`;
  //   }
  // QUERYS:
  @Get('query')
  getProductsQuery(@Query() params: any) {
    const { limit, offset } = params;
    return `products limit=> ${limit} and offset=> ${offset}`;
  }
  @Get('query_')
  getProductsQuery_(
    @Query('limit') limit = 0,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products limit=> ${limit} and offset=> ${offset}and brand=> ${brand}`;
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('productId', ParseIntPipe) productId: number, @Body() payload: UpdateProductDto,) {
    return this.productService.update(productId, payload);
  }
  @Put(':productId/category/:categoryId')
  @HttpCode(HttpStatus.ACCEPTED)
  addCategoryInProduct(@Param('productId', ParseIntPipe) productId: number, @Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.productService.addCategoryInProduct(productId, categoryId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
  @Delete(':productId/category/:categoryId')
  deleteCategory(@Param('productId', ParseIntPipe) productId: number, @Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.productService.removeCategoryOfProduct(productId, categoryId);
  }

  // // create(@Body('price') price: number) {
  // //   return {message: 'action create', price}
  // // }
  //
  // @Put(':productId')
  // update(
  //   @Param('productId') productId: string,
  //   @Body() payload: UpdateProductDto,
  // ) {
  //   // return {productId, payload}
  //   return this.productService.update(+productId, payload);
  // }
  //
  // @Delete(':productId')
  // delete(@Param('productId') productId: string) {
  //   //return productId
  //   return this.productService.remove(+productId);
  // }
}
