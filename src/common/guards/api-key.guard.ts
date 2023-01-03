import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization'); // sprawdzamy API_Keya w headerze który przesyła do nas uzytkownik
    return authHeader === process.env.API_KEY;
  } // to zawsze musi być w guardzie, zawsze zwraca boolean, w zalezności czy zwróci true/false to dostaniemy sie lub nie do danej routy
}
