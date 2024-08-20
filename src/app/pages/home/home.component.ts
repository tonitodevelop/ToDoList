import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  isLogIn: boolean = false;
  private suscription: Subscription | undefined;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkToken();
    this.loadIsLogInUser();
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }
  
  private loadIsLogInUser(): void {
    this.suscription = this.authService.isLogIn$.subscribe((response: boolean) => {
      this.isLogIn = response;
    })
  }

}
