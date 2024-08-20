import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginUser, LoginUserResponse, UserDetail } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private suscription: Subscription | undefined;
  loginForm!: FormGroup; 
  errorLogin: string = '';
  @ViewChild('loginFormDirective') private loginFormDirective: NgForm | undefined;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }
 
  ngOnInit(): void {
    this.loadLoginForm();
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  onLogin(): void {
    const loginData: LoginUser = Object.assign({}, this.loginForm.value);

    this.suscription = this.authService.login(loginData).subscribe((response: LoginUserResponse) => {
      
      if (response.token) {       
        this.router.navigate(['todo']);
        this.loginFormDirective?.resetForm();
      }else{
        this.errorLogin = '* Usuario o Contraseña Incorrectos!';
      }
    })
  
  }
  
  private loadLoginForm(): void {
    this.loginForm = this.fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    })
  }

  get username(): AbstractControl<any, any> | null {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl<any, any> | null {
    return this.loginForm.get('password');
  }

}
 