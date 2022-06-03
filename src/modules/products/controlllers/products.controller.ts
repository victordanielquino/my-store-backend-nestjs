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
import { ParseIntPipe } from '../../../common/parse-int.pipe';
import {ApiTags} from "@nestjs/swagger";

import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

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
  getProductsAll(
    @Query('limit') limit = 0,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productService.findAll();
  }
  /*@Get(':id')
  getProductById(@Param() params: any) {
    return `product with id: ${params.id}`;
  }*/
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProductById(@Param('productId', ParseIntPipe) productId: number) {
    /*return {
      message: `product with id ok: ${productId}`
    }*/
    return this.productService.findById(productId);
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
    // return {message: 'action create', payload,}
    return this.productService.create(payload);
  }
  // create(@Body('price') price: number) {
  //   return {message: 'action create', price}
  // }

  @Put(':productId')
  update(
    @Param('productId') productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    // return {productId, payload}
    return this.productService.update(+productId, payload);
  }

  @Delete(':productId')
  delete(@Param('productId') productId: string) {
    //return productId
    return this.productService.remove(+productId);
  }
}
