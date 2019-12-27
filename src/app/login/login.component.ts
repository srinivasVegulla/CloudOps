import { Component, OnInit, Inject } from '@angular/core';
import { CopsService } from '../service.component';
import { LoginService } from './login.service';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'cops-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  loginError;

  constructor(
    private loginService: LoginService, 
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['cloudadmin', Validators.required],
      password: ['tcs@12345', Validators.required],
    });
  }

  get username() { 
    return this.loginForm.get('username'); 
  }
  get password() { 
    return this.loginForm.get('password'); 
  }

  onLogin(loginData) {
 //   console.log('hi lSer.isLogIn', localStorage.getItem("redirectUrl"));
    this.loginService.login(loginData).subscribe(
      (response: any) => {
        if(response == true) {
          this.loginError = false;
        //  this.storage.set("isLoggedIn", "true");
          localStorage.setItem("isLoggedIn", 'true');
          this.loginService.isLoggedIn = true;
          if(localStorage.getItem("redirectUrl")) {
            this.router.navigate([localStorage.getItem("redirectUrl")]);
          } else {
            this.router.navigate(['/home/dashboard']);
          }
        } else {
          this.loginError = true;
          this.loginService.isLoggedIn = false;
        }       
      }, (error) => {

      });
  }

}
