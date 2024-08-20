import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TodoItemDetail } from 'src/app/core/models/todo-item';
import { TodoListDetail } from 'src/app/core/models/todo-list';
import { TodoListService } from 'src/app/core/services/todo-list.service';
import { BaseItemComponent } from '../base-item/base-item.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent extends BaseItemComponent<TodoListDetail> {
  constructor(private todoListService: TodoListService) {
    super();
  }

  onEditTodoList(todoList: TodoListDetail | undefined): void {
    this.todoListService.setTodoList(todoList);
  }

}
