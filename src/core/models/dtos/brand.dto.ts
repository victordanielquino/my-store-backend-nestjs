import {
  IsString,
  IsUrl,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Product } from '../entities';

export class BrandReadDto {
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

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly image: string;

  @IsOptional()
  @ApiProperty()
  @Expose()
  readonly products: Product[];
}

export class BrandCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly image: string;
}

export class BrandUpdateDto extends PartialType(BrandCreateDto) {}
