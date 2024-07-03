import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorization = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('No se encuentra header de autorización');
    }

    const [type, token] = req.headers['authorization']?.split(' ');

    if (type !== 'Bearer')
      throw new UnauthorizedException('Tipo de token no válido');

    if (!token) throw new UnauthorizedException('Bearer token no encontrado');

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      req.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token invalido');
    }
  }
}
