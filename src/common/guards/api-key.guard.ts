import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      // jesli route jest z dekoratorem public, to pozwalaj na dostep zawsze, nawet bez api keya
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization'); // sprawdzamy API_Keya w headerze który przesyła do nas uzytkownik
    // return authHeader === process.env.API_KEY; // avoid using process.env
    return authHeader === this.configService.get('API_KEY');
  } // to zawsze musi być w guardzie, zawsze zwraca boolean, w zalezności czy zwróci true/false to dostaniemy sie lub nie do danej routy
}
