import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {Category} from "../entities/category.entity";
import {CreateCategoryDto, UpdateCategoryDto} from "../dtos/categories.dtos";

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private categoriesRepo: Repository<Category>) {
    }

    findAll() {
        return this.categoriesRepo.find();
    }

    async findOne(id: number) {
        const category = await this.categoriesRepo.findOne({
            where: {
                id: id
            },
            relations: {
                products: true
            }
        })
        if (!category) throw new NotFoundException(`Category #${id} not exits.`);
        return category;
    }

    create(data: CreateCategoryDto) {
        const newCategory = this.categoriesRepo.create(data);
        return this.categoriesRepo.save(newCategory);
    }

    async update(id:number, change: UpdateCategoryDto) {
        const category = await this.categoriesRepo.findOneBy({id: id});
        this.categoriesRepo.merge(category, change);
        return this.categoriesRepo.save(category);
    }

    remove(id: number) {
        return this.categoriesRepo.delete(id);
    }
}
