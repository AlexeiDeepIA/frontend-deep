import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthLoginService } from './auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class CatchTokenService {

  constructor(
    private authService: AuthLoginService
  ) { }

  intercept(req: any, next: any){
    const tokenizeReq = req.clone({
      setHeaders:{
        Authorization: `Bearrer ${this.authService.getToken()}`
      }
    })
    return next.handle(tokenizeReq);
  }
}