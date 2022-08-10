import {
  IsString,
  IsNumber,
  IsUrl,
  IsEmail,
  IsNotEmpty,
  IsDate,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Brand, Category } from '../entities';
//import { PartialType } from "@nestjs/mapped-types";

export class ProductReadDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  @Expose()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  @Expose()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  @Expose()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly image: string;

  @IsOptional()
  @ApiProperty()
  @Expose()
  readonly brand: Brand;

  @IsOptional()
  @ApiProperty()
  @Expose()
  readonly categories: Category[];
}

export class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  @Expose()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  @Expose()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  @Expose()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly categoriesIds: number[];
}

// con PartialType haremos que las validaciones opcionales sean dinamicas
/*
export class ProductUpdateDto {
    readonly name?: string;
    readonly description?: string;
    readonly price?: number;
    readonly stock?: number;
    readonly image?: string;
}*/
export class ProductUpdateDto extends PartialType(ProductCreateDto) {}

export class ProductFilterDto {
  @IsOptional()
  @IsPositive()
  limit: number; // cuento elementos se sacara

  @IsOptional()
  @Min(0)
  offset: number; // desde que elemento se hara el get

  @IsOptional()
  @IsPositive()
  priceMin: number;

  @ValidateIf((item) => item.priceMin)
  @IsPositive()
  priceMax: number;
}
