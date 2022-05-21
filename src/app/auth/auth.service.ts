import { Injectable } from '@angular/core';
import { SignupData } from '../models/signup-data';
import { AuthData } from '../models/auth-data';
import { BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = "http://localhost:4201";
  private authSubject = new BehaviorSubject<null|AuthData>(null);
  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map(user => !!user));

  jwtHelper = new JwtHelperService();

  autologoutTimer: any;


  constructor(private http: HttpClient, private router: Router){
    this.restoreUser();
  }

  login(data: {email: string; password: string}){
    return this.http.post<AuthData>(`${this.URL}/login`, data).pipe(
      tap((val) => {
        console.log(val);
      }),
      tap((data) => {
        this.authSubject.next(data);
        localStorage.setItem('user', JSON.stringify(data));
        const expirationDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
        this.autoLogout(expirationDate)
      }
    ),
    catchError(this.errors)
    );
  }

  logout(){
    this.authSubject.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
    if(this.autologoutTimer){
      clearTimeout(this.autologoutTimer);
    }
  }

  autoLogout(expirationDate: Date){
    const expirationMilliseconds = expirationDate.getTime() - new Date().getTime();
    this.autologoutTimer = setTimeout(() => {
      this.logout();
    }, expirationMilliseconds);
  }

  restoreUser(){
    const loggedUserData = localStorage.getItem('user');
    if(!loggedUserData) return;
    const user: AuthData = JSON.parse(loggedUserData);
    if(this.jwtHelper.isTokenExpired(user.accessToken)){
      return
    }
    this.authSubject.next(user)
    const expirationDate = this.jwtHelper.getTokenExpirationDate(user.accessToken) as Date
    this.autoLogout(expirationDate);
  }

  signUp(data: SignupData){
    return this.http.post(`${this.URL}/register`, data).pipe(catchError(this.errors));
  }

  getUserInfo(){
    let temp;
    this.user$.subscribe(user => temp = user?.user);
    return temp;
  }

  getUserId(){
    let loggedUser = this.getUserInfo();
    if(loggedUser != undefined){
      return loggedUser['id'];
    }
    return 0;
  }

  private errors(err: any) {
    switch (err.error) {
      case "Email and password are required":
        return throwError("Email e password sono obbligatorie");
        break;
      case "Email already exists":
        return throwError("Esiste già un utente con questa mail");
        break;
      case "Email format is invalid":
        return throwError("La mail inserita non è valida");
        break;
      case "Cannot find user":
        return throwError("Non esiste alcun utente registrato con questa email");
        break;

      default:
        return throwError("Errore nella chiamata");
        break;
    }
  }

}
