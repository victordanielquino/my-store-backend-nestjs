import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCreateDto {
  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}
