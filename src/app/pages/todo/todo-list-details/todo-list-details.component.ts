import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TodoListDetail } from 'src/app/core/models/todo-list';
import { TodoListService } from 'src/app/core/services/todo-list.service';

@Component({
  selector: 'app-todo-list-details',
  templateUrl: './todo-list-details.component.html',
  styleUrls: ['./todo-list-details.component.scss']
})
export class TodoListDetailsComponent implements OnInit, OnDestroy {
  items: TodoListDetail[] = [];
  private suscription: Subscription | undefined;
  @Input() userId: number | undefined;
  todoSelected: TodoListDetail[] = [];
  ckbFormList!: FormGroup;

  constructor(private todoListService: TodoListService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.suscription = this.todoListService.todoListAll$.subscribe(() => {
      this.loadTodoListByUser();
    })
    this.loadTodoListByUser();
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  onDeleteTodoList(listToDelete: TodoListDetail[]): void {

    const items = listToDelete.map((item) => { return item.id });
    this.suscription = this.todoListService.removeSelectedTodoList(items).subscribe((response: boolean) => {
      if (response) {
        this.clearTodoListaData();
        this.loadTodoListByUser();
      }
    })
  }

  checkedCheckBoxList(event: TodoListDetail, listId: number): void {
    if (event) {
      this.todoSelected.push(event);
    } else {
      this.todoSelected = this.todoSelected.filter(todo => todo.id !== listId)
    }
  }

  private loadTodoListByUser(): void {
    if (this.userId) {
      this.suscription = this.todoListService.getAllTodoListByUserId(this.userId).subscribe((response: TodoListDetail[]) => {
        this.items = response;
      })
    }
  }

  private clearTodoListaData(): void {
    this.todoSelected = [];
  }

}
