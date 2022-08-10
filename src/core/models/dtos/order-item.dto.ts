import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Order, Product } from '../entities';

export class OrderItemReadDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly orderId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly quantity: number;

  @IsOptional()
  @ApiProperty()
  @Expose()
  readonly product: Product;

  @IsOptional()
  @ApiProperty()
  @Expose()
  readonly order: Order;
}

export class OrderItemCreateDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly orderId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly quantity: number;
}

export class OrderItemUpdateDto extends PartialType(OrderItemCreateDto) {}
