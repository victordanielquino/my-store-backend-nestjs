import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Customer, OrderItem } from '../entities';

export class OrderReadDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly id: number;

  @IsOptional()
  @ApiProperty()
  @Expose()
  readonly customer: Customer;

  @IsOptional()
  @ApiProperty()
  @Expose()
  readonly items: OrderItem[];
}

export class OrderCreateDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly customerId: number;
}

export class OrderUpdateDto extends PartialType(OrderCreateDto) {}
