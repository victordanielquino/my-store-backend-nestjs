import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {Between, Repository, FindOptionsWhere} from "typeorm";

import {CreateProductDto, FilterProductDto, UpdateProductDto} from '../dtos/products.dtos';
import { Product } from '../entities/product.entity';
import {Brand} from "../entities/brand.entity";
import {Category} from "../entities/category.entity";

@Injectable()
export class ProductsService {

  constructor(
      @InjectRepository(Product) private productRepo: Repository<Product>,
      @InjectRepository(Brand) private brandsRepo: Repository<Brand>,
      @InjectRepository(Category) private categoryRepo: Repository<Category>
  ) {
  }

  /*findAll(params?: FilterProductDto) {
    if (params){
      const { limit, offset } = params;
      return this.productRepo.find({
        relations: { brand: true},
        take: limit,
        skip: offset,
      })
    }
    return this.productRepo.find();
  }*/
  async findAll(params?: FilterProductDto) {
    if (params) {
      const whereIS: FindOptionsWhere<Product>= {}
      const {limit, offset} = params;
      const {priceMin, priceMax} = params;
      if (priceMin && priceMax) {
        whereIS.price = Between(priceMin, priceMax);
      }
      return await this.productRepo.find({
        relations: {brand: true},
        where: whereIS,
        take: limit,
        skip: offset,
      })
    }
    return this.productRepo.find({
      relations: {brand: true}
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        brand: true,
        categories: true
      }
    },);

    if (!product) throw new NotFoundException(`Product #${id} not exist`);
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data); // se instancia pero no se guarda
    if (data.brandId) {
      const brand = await this.brandsRepo.findOneBy({id: data.brandId});
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(data.categoriesIds);
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, change: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({id: id});
    if (change.brandId) {
      const brand = await this.brandsRepo.findOneBy({id: change.brandId});
      product.brand = brand;
    }
    if (change.categoriesIds){
      const categories = await this.categoryRepo.findByIds(change.categoriesIds);
      product.categories = categories;
    }
    this.productRepo.merge(product, change);
    return this.productRepo.save(product);
  }

  async removeCategoryOfProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: {id: productId},
      relations: { categories:true }
    });
    product.categories = product.categories.filter((item) => item.id !== categoryId);
    return this.productRepo.save(product);
  }

  async addCategoryInProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: {id: productId},
      relations: { categories:true }
    });
    const category = await this.categoryRepo.findOneBy({id: categoryId});
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }


  // METODOS SEARCH:
  // findAll() {
  //   return this.products;
  // }
  // findById(id: number) {
  //   const product = this.products.find((item) => item.id === id);
  //   if (!product)
  //     throw new NotFoundException(`findById: el producto #${id} not found`);
  //   return product;
  // }
  // // METODOS ADD:
  // create(payload: CreateProductDto) {
  //   //console.log('payload:',payload)
  //   this.counterId++;
  //   const newProduct = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }
  //
  // update(id: number, payload: UpdateProductDto) {
  //   const product = this.findById(id);
  //   if (product) {
  //     const index = this.products.findIndex((item) => item.id === id);
  //     this.products[index] = {
  //       ...product,
  //       ...payload,
  //     };
  //     return this.products[index];
  //   }
  //   return null;
  // }
  //
  // remove(id: number) {
  //   const product = this.findById(id);
  //   if (!product)
  //     throw new NotFoundException(`remove: el producto #${id} not found`);
  //   this.products = this.products.filter((items) => items.id !== id);
  //   return true;
  // }
}
