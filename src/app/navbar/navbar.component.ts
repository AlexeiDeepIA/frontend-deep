import { Component } from '@angular/core';
import { AuthLoginService } from '../_services/auth-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authLoginService: AuthLoginService){}

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(){
    this.authLoginService.logout();
  }

}
