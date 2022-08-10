import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../../../core/models/entities';
import {
  CategoryCreateDto,
  CategoryUpdateDto,
} from '../../../core/models/dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoriesRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoriesRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        products: true,
      },
    });
    if (!category) throw new NotFoundException(`Category #${id} not exits.`);
    return category;
  }

  create(data: CategoryCreateDto) {
    const newCategory = this.categoriesRepo.create(data);
    return this.categoriesRepo.save(newCategory);
  }

  async update(id: number, change: CategoryUpdateDto) {
    const category = await this.categoriesRepo.findOneBy({ id: id });
    this.categoriesRepo.merge(category, change);
    return this.categoriesRepo.save(category);
  }

  remove(id: number) {
    return this.categoriesRepo.delete(id);
  }
}
