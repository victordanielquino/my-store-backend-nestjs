import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUPLIC_KEY } from '../decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // leemos la metadata: preguntamos si el endPoint lleva el docorador isPublic
    const isPublic = this.reflector.get(IS_PUPLIC_KEY, context.getHandler());
    if (isPublic) return true;

    // si el endPoint no lleva el decorador isPublic, sigue con el guardian 'jwt':
    return super.canActivate(context);
  }
}
