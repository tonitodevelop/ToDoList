import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TodoDetail } from 'src/app/core/models/todo-details';
import { TodoItemDetail } from 'src/app/core/models/todo-item';
import { TodoListDetail } from 'src/app/core/models/todo-list';
import { TodoItemService } from 'src/app/core/services/todo-item.service';
import { BaseItemComponent } from '../base-item/base-item.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent extends BaseItemComponent<TodoItemDetail> {  

  constructor(private todoItemService: TodoItemService)  {
    super();
  }

  onEditTodoItem(item: TodoItemDetail): void {
    this.todoItemService.setTodoItem(item);
  }

}
