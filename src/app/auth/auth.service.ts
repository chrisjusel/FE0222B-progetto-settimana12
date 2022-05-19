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


  constructor(private http: HttpClient, private router: Router){}

  login(data: {email: string; password: string}){
    return this.http.post<AuthData>(`${this.URL}/login`, data).pipe(
      tap((val) => {
        console.log(val);
      }),
      tap((data) => {
        this.authSubject.next(data);
        localStorage.setItem('user', JSON.stringify(data));
      }
    ),
    catchError(this.errors)
    );
  }


  private errors(err: any) {
    // console.error(err)
    switch (err.error) {
      case "Email and password are required":
        return throwError("Email e password sono obbligatorie");
        break;
      case "Email already exists":
        return throwError("Utente gia registrato");
        break;
      case "Email format is invalid":
        return throwError("Email scritta male");
        break;
      case "Cannot find user":
        return throwError("Utente non esiste");
        break;

      default:
        return throwError("Errore nella chiamata");
        break;
    }
  }

}
