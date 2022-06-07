import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {Brand} from "../entities/brand.entity";
import {CreateBrandDto, UpdateBrandDto} from "../dtos/brands.dtos";

@Injectable()
export class BrandsService {

    constructor(
        @InjectRepository(Brand) private brandsRepo: Repository<Brand>,
    ) {
    }

    findAll() {
        return this.brandsRepo.find();
    }

    async findOne(id:number) {
        const brand = await this.brandsRepo.findOne({
            where: {
                id: id
            },
            relations: {
                products: true
            }
        });
        if (!brand) throw new NotFoundException(`Brand #${id} not exits.`);
        return brand;
    }

    async create(data: CreateBrandDto) {
        const newBrand = this.brandsRepo.create(data); // se instancia pero no se guarda
        return this.brandsRepo.save(newBrand);
    }

    async update(id: number, change: UpdateBrandDto) {
        const brand = await this.brandsRepo.findOneBy({id:id});
        this.brandsRepo.merge(brand, change);
        return this.brandsRepo.save(brand);
    }

    remove(id: number) {
        return this.brandsRepo.delete(id);
    }
}
