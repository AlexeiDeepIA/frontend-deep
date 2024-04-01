import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthLoginService } from './auth-login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthRoutesService implements CanActivate{

  constructor(
    private authService: AuthLoginService,
    private router: Router
    ) { }

    canActivate(): boolean{
      if(this.authService.isLogged()){
        return true;
      }
      console.log('Redirecting to /login');
      this.router.navigateByUrl('/login');
      return false;    
    }
}
