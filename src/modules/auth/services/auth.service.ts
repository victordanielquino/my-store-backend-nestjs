import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../users/services/user.service';
import { PayloadToken } from './interface/token.interface';
import { plainToClass } from 'class-transformer';
import { UserAuthReadDto } from '../../../core/models/dtos';
import { RoleEnum } from '../../../core/enums';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // METODO DE VALIDACION:
  async validationUser(username: string, password: string) {
    const user = await this.usersService.getOneByUsername(username);
    if (user) {
      const authDto = plainToClass(UserAuthReadDto, user, {
        excludeExtraneousValues: true,
      });
      const isMath = await bcrypt.compare(password, user.password);
      if (isMath) {
        delete authDto.password;
        return authDto;
      }
    }
    return null;
  }

  // METODO QUE GENERARA EL JWT:
  login(authDto: UserAuthReadDto) {
    const roles = authDto.roles.map((item) => RoleEnum[item.initial] || 'SR');
    // role: permiso que tiene, sub: identificador del usuario
    const paylod: PayloadToken = {
      id: authDto.id,
      username: authDto.username,
      role: roles[0],
    };
    return {
      access_token: this.jwtService.sign(paylod),
      authDto,
    };
  }
}
