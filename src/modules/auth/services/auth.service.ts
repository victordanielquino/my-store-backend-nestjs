import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../users/services/user.service';
import { User } from '../../../core/models';
import { PayloadToken } from '../Models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // METODO DE VALIDACION:
  async validationUser(email: string, password: string) {
    const user = await this.usersService.getOneByUsername(email);
    if (user) {
      const isMath = await bcrypt.compare(password, user.password);
      if (isMath) return user;
    }
    return null;
  }

  // METODO QUE GENERARA EL JWT:
  generateJWT(user: User) {
    // role: permiso que tiene, sub: identificador del usuario
    const paylod: PayloadToken = { role: 'ADMIN', sub: user.id };
    return {
      access_token: this.jwtService.sign(paylod),
      user,
    };
  }
}
