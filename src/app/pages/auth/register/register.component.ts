import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterUser } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy{
  registerForm!: FormGroup;
  private suscription: Subscription | undefined;
  @ViewChild('registerFormDirective') private registerFormDirective: NgForm | undefined;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService){}
 
  ngOnInit(): void {
    this.loadRegisterForm();
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  onRegister(): void {
    const registerData: RegisterUser = Object.assign({}, this.registerForm.value);

    this.suscription = this.authService.register(registerData).subscribe((response: boolean) => {
      if(response){
        this.router.navigate(['auth/login']);
        this.registerFormDirective?.resetForm();
      }
    }) 
    
  }

  private loadRegisterForm(): void{
    this.registerForm = this.fb.group({
      'username': ['',[Validators.required]],
      'name': ['',[Validators.required]],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get username(): AbstractControl<any, any> | null{
    return this.registerForm.get('username');
  }


  get name(): AbstractControl<any, any> | null{
    return this.registerForm.get('name');
  }

  get password(): AbstractControl<any, any> | null{
    return this.registerForm.get('password');
  }
}
