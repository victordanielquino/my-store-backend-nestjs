import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Role, User } from '../models';
import { RoleReadDto } from './role.dto';
import { UserReadDto } from './user.dto';
import { Expose } from 'class-transformer';

export class UserRoleReadDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  user: UserReadDto;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  role: RoleReadDto;
}

export class UserRoleCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  user: User;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  role: Role;
}

export class UserRoleUpdateDto extends PartialType(UserRoleCreateDto) {}
