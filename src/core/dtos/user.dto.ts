import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPositive,
  Length,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'the username of user' })
  @Expose()
  readonly username: string;

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
  @IsArray()
  @ApiProperty()
  @Expose()
  readonly roleId: number[];
}

export class UserUpdateDto extends PartialType(UserCreateDto) {}

export class UserAuthReadDto {
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

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  @Expose()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  @Expose()
  roles: RoleReadDto[];
}
