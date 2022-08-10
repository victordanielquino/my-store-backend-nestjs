import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Product } from '../entities';

export class CategoryReadDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly name: string;

  @IsOptional()
  @ApiProperty()
  @Expose()
  readonly products: Product[];
}

export class CategoryCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly name: string;
}

export class CategoryUpdateDto extends PartialType(CategoryCreateDto) {}
