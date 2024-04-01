import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginService } from '../_services/auth-login.service';
import { Users } from '../_models/user.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

    user = {};

    constructor(
      private authService: AuthLoginService,
      private router: Router,      
    ) { }

    signIn(loginForm: NgForm){
      this.authService.signInUser(loginForm.value).subscribe((res: any) =>{
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res._id);
          if(!res.success == true){
              Swal.fire({
                toast: true,
                icon: 'error',
                title: res.message,
                animation: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1200,
                timerProgressBar: true,
                didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })            
          } else{
              Swal.fire({
                toast: true,
                icon: 'success',
                title: res.message,
                animation: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1200,
                timerProgressBar: true,
                didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          }).then((res) =>{
              this.router.navigate(['/landing'])
          })
          }        
        })
      }
          
      logout(){
        this.authService.logout()
      }
}
