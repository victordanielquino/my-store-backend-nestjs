import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators';
import { PayloadToken } from '../../modules/auth/services/interface/token.interface';
import { RoleEnum } from '../enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // leemos la petadata

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // obtenemos la metadata del endPoint:
    // rolesEndPoint: ['admin', 'cutomer', 'superadmin']
    const rolesEndpoint = this.reflector.get<RoleEnum[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!rolesEndpoint) {
      // si el endPoint no tiene el decorador @Roles(), return true
      return true;
    }

    // obtenermos el rol del usuario que quiere ingresar al endPoint y si hace match con el de la metadata
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    // user = { role: 'admin', sub: 123.. }

    // verificamos si es que @Roles() tiene roles que coinciden con los del usuario:
    const isAuth = rolesEndpoint.some((role) => role == user.role);
    if (!isAuth)
      throw new UnauthorizedException(
        'tu usuario no tiene acceso a este endPoint.',
      );
    return true;
  }
}
