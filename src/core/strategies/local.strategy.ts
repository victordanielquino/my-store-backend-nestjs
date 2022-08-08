import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../../modules/auth/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validationUser(username, password);
    console.log('jejeje:', user);
    if (!user) {
      // responde al front si es que su user o email son no validos
      throw new UnauthorizedException('local.strategy.ts: usuario no valido');
    }
    return user;
  }
}
