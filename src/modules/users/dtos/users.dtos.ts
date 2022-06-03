import {
  IsString,
  IsNumber,
  IsUrl,
  IsEmail,
  IsNotEmpty,
  IsDate,
  IsPositive,
} from 'class-validator';
//import { PartialType } from "@nestjs/mapped-types";
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
