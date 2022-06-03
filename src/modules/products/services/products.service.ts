import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'descripcion',
      price: 123,
      image: '',
      stock: 12,
    },
  ];
  private counterId = 1;

  // METODOS SEARCH:
  findAll() {
    return this.products;
  }
  findById(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product)
      throw new NotFoundException(`findById: el producto #${id} not found`);
    return product;
  }
  // METODOS ADD:
  create(payload: CreateProductDto) {
    //console.log('payload:',payload)
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  
  update(id: number, payload: UpdateProductDto) {
    const product = this.findById(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  remove(id: number) {
    const product = this.findById(id);
    if (!product)
      throw new NotFoundException(`remove: el producto #${id} not found`);
    this.products = this.products.filter((items) => items.id !== id);
    return true;
  }
}
