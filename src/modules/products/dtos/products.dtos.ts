import {
  IsString,
  IsNumber,
  IsUrl,
  IsEmail,
  IsNotEmpty,
  IsDate,
  IsPositive,
  IsArray, IsOptional, Min, ValidateIf,
} from 'class-validator';
//import { PartialType } from "@nestjs/mapped-types";
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriesIds: number[];
}

// con PartialType haremos que las validaciones opcionales sean dinamicas
/*
export class UpdateProductDto {
    readonly name?: string;
    readonly description?: string;
    readonly price?: number;
    readonly stock?: number;
    readonly image?: string;
}*/
export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  priceMin: number;

  @ValidateIf((item) => item.priceMin)
  @IsPositive()
  priceMax: number;
}