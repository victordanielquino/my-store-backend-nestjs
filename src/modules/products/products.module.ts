import { Module } from '@nestjs/common';
import { ProductsController } from './controlllers/products.controller';
import { CategoriesController } from './controlllers/categories.controller';
import { ProductsService } from './services/products.service';

@Module({
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
