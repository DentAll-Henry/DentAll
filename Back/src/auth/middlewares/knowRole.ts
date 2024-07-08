import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { environment } from '../../config/environment';

@Injectable()
export class KnowRoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de acceso inválido');
    }

    const token = authHeader.split(' ')[1];
    const secret: string = environment.jwt as string;
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, secret);
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    const roles: string = decodedToken.roles || "";

    req['userRoles'] = roles;

    next();
  }
}
