import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDetail } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  userDetail: UserDetail | undefined;
  isLogIn = false;
  private suscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) { }
  

  ngOnInit(): void {
    this.authService.checkToken();
    this.isLogInUser();
    this.loadUserDetail();
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  logout(): void { 
      
    this.authService.logOut();
    this.router.navigate(['home']);
  }
  

  private loadUserDetail(): void{
    this.suscription = this.authService.userDetail$.subscribe((response: UserDetail | undefined) => {
      this.userDetail = response;
    })
    
  }

  private isLogInUser(): void{
    this.suscription = this.authService.isLogIn$.subscribe((response: boolean) => {
      this.isLogIn = response;
    }) 
  }

  

 

  
}
