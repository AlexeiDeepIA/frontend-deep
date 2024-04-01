import { Component } from '@angular/core';
import { AuthLoginService } from '../_services/auth-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private authService: AuthLoginService
  ) { }

  isOpen = false;

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  logout(){
    this.authService.logout();
  }

}
