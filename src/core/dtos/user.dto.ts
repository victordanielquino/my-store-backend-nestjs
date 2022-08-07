import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPositive,
  Length,
  IsOptional,
  IsNumber,
} from 'class-validator';
//import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { Role } from '../models';
import { Expose } from 'class-transformer';
import { RoleReadDto } from './role.dto';
import { Customer } from '../../modules/users/entities';

export class UserReadDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'the id of user' })
  @Expose()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the email of user' })
  @Expose()
  readonly username: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  @Expose()
  readonly customer: Customer;

  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  @Expose()
  roles: RoleReadDto[];
}

export class UserCreateDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  @Expose()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  @Expose()
  readonly password: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  @Expose()
  readonly customerId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  @Expose()
  readonly roleId: number;
}

export class UserUpdateDto extends PartialType(UserCreateDto) {}

export class UserAuthReadDto extends PartialType(UserReadDto) {
  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  @Expose()
  readonly password: string;
}
