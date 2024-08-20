import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoListDetail } from 'src/app/core/models/todo-list';
import { TodoListService } from 'src/app/core/services/todo-list.service';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list-settings',
  templateUrl: './todo-list-settings.component.html',
  styleUrls: ['./todo-list-settings.component.scss']
})
export class TodoListSettingsComponent implements OnInit, OnDestroy {
  todoListDetail: TodoListDetail | undefined;
  todoListId: number = 0;
  private subscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.loadTodoListIdFromParam();
    this.loadTodoListDetail();

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadTodoListIdFromParam(): void {
    this.route.paramMap.pipe(
      map((param) => {
        return Number(param.get('id'))
      })
    ).subscribe((id) => {
      this.todoListId = id;
    })

  }
  private loadTodoListDetail(): void {
    this.subscription = this.todoListService.getTodoListById(this.todoListId).subscribe((response: TodoListDetail) => {
      this.todoListDetail = response;
    })

  }

}
