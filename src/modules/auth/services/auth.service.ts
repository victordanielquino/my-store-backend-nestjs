import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entity';
import { PayloadToken } from '../Models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // METODO DE VALIDACION:
  async validationUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMath = await bcrypt.compare(password, user.password);
      if (isMath) return user;
    }
    return null;
  }

  // METODO QUE GENERARA EL JWT:
  generateJWT(user: User) {
    // role: permiso que tiene, sub: identificador del usuario
    const paylod: PayloadToken = { role: user.role.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(paylod),
      user,
    };
  }
}
