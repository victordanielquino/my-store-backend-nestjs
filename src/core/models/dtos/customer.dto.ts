import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Order, User } from '../entities';

export class CustomerReadDto {
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly phone: string;

  @IsOptional()
  @ApiProperty()
  @Expose()
  readonly user: User;

  @IsOptional()
  @ApiProperty()
  @Expose()
  readonly orders: Order[];
}

export class CustomerCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly lastName: string;

  //@IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly phone: string;
}

export class CustomerUpdateDto extends PartialType(CustomerCreateDto) {}
