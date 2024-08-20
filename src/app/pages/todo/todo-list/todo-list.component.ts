import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserDetail } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy{
  user: UserDetail | undefined;
  todoListForm!: FormGroup;
  private suscription: Subscription | undefined;

  constructor(private authService: AuthService){}
  
  ngOnInit(): void {
    this.authService.checkToken();
    this.loadLogInUser(); 
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }
  
  private loadLogInUser(): void {
    this.suscription = this.authService.userDetail$.subscribe((response: UserDetail | undefined) => {
      if(response)
        this.user = response;
    })
  }

  
}
