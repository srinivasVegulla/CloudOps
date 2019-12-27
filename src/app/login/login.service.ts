import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
   private http:HttpClient
  ) { }

  isLoggedIn;
  redirectUrl;

  login(loginData) {

    return this.http.post('http://10.138.77.193:11111/ldapauth', loginData)
        .pipe(map((res) => {
           return res;
        }));
  }
  
}
