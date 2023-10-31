import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {Request} from "express";
import {CookiesService} from "./cookies.service";
import {JwtService} from "@nestjs/jwt";
import * as process from "process";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;
    const token = request.cookies[CookiesService.tokenKey];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const sessionToken = this.jwtService.verify(token, { secret: process.env.SECRET_KEY })

      request['session'] = sessionToken;
    } catch {
      throw new UnauthorizedException()
    }

    return true;
  }
}
