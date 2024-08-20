import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { LoginUser, LoginUserResponse, RegisterUser, UserDetail } from '../models/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.API_URL + 'auth';
  private _isLogIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _userId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _userDetail: BehaviorSubject<UserDetail | undefined> = new BehaviorSubject<UserDetail | undefined>(undefined);
  constructor(private http: HttpClient, private router: Router) { }

  get isLogIn$(): Observable<boolean> {
    return this._isLogIn.asObservable();
  }

  get userId$(): Observable<number>{
    return this._userId.asObservable();
  }

  get userDetail$(): Observable<UserDetail | undefined>{
    return this._userDetail.asObservable();
  }

  register(user: RegisterUser): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/register`, user);
  }

  login(user: LoginUser): Observable<LoginUserResponse> {
    return this.http.post<LoginUserResponse>(`${this.baseUrl}/login`, user)
      .pipe(
        
        tap((response: LoginUserResponse) => {
          
          if (response.token) {
            this._isLogIn.next(true);
            const userDetail: UserDetail = {id: response.userId, userName: response.userName};
            this._userDetail.next(userDetail);
            this.saveUserInfo(userDetail);
            this.saveToken(response.token);
          }
        }),
        catchError((err: any) => this.handlerError(err))
      );
  }

  getUserDetail(id: number): Observable<UserDetail | undefined> {
    return this.http.get<UserDetail>(`${this.baseUrl}/user/${id}`);
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    this._isLogIn.next(false);
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private saveUserInfo(userDetail: UserDetail): void {
    localStorage.setItem('user', JSON.stringify(userDetail));
  }

  checkToken(): void {
    
    const tokenValue = localStorage.getItem('token');
    const user: UserDetail = JSON.parse(localStorage.getItem('user')!);    

    if (tokenValue && user) {
      if(this.isTokenExpired(tokenValue)){
        this._isLogIn.next(false);
        this._userDetail.next(undefined);
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        this.router.navigate(['home']);
      }
      this._userDetail.next(user)
      this._isLogIn.next(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this._isLogIn.next(false);
      this._userDetail.next(undefined);
    }

  }

  private isTokenExpired(token: string) {
    /*const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();*/
    return helper.isTokenExpired(token);
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'Ha ocurrido un error obteniendo los datos';
    if (err) {
      errorMessage = `Error code: ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
