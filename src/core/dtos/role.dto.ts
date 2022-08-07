import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPositive,
  Length,
  IsOptional,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RoleReadDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  id: number;

  @IsString()
  @ApiProperty()
  @Expose()
  initial: string;

  @IsString()
  @ApiProperty()
  @Expose()
  description: string;

  @IsString()
  @ApiProperty()
  @Expose()
  state: string;
}

export class RoleCreateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(7)
  @ApiProperty({ description: 'the name of role' })
  @Expose()
  readonly initial: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the name of role' })
  @Expose()
  readonly description: string;
}

export class RoleUpdateDto extends PartialType(RoleCreateDto) {
  @IsString()
  @MaxLength(5)
  @IsOptional()
  @ApiProperty()
  @Expose()
  state: string;
}
