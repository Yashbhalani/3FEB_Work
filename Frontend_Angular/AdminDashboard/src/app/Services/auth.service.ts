import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public signIn(userData: User) {

    if(userData.username == "admin123@gmail.com" &&
            userData.password == "password123456789") {

          localStorage.setItem('ACCESS_TOKEN', userData.username);

          return true;
    }

    return false;
    
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  
  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
