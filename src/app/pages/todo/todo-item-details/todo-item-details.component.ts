import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoItemDetail } from 'src/app/core/models/todo-item';
import { TodoListDetail } from 'src/app/core/models/todo-list';
import { TodoItemService } from 'src/app/core/services/todo-item.service';
import { TodoListService } from 'src/app/core/services/todo-list.service';

@Component({
  selector: 'app-todo-item-details',
  templateUrl: './todo-item-details.component.html',
  styleUrls: ['./todo-item-details.component.scss']
})
export class TodoItemDetailsComponent implements OnInit, OnDestroy {
  todoItems: TodoItemDetail[] = [];
  todoList: TodoListDetail | undefined;
  @Input() todoListId: number | undefined;
  private suscription: Subscription | undefined;
  itemSelectedFromCheckBox: TodoItemDetail[] = [];
  itemPendingSelectedFromCheckBox: TodoItemDetail[] = [];

  constructor(private todoItemService: TodoItemService, private todoListService: TodoListService) { }

  ngOnInit(): void {

    this.loadTodoList();
    this.suscription = this.todoItemService.todoItems$.subscribe(() => {
      this.loadItemsDetails();
    })
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }


  onDeleteTodoItem(itemsDetail: TodoItemDetail[]): void {
    const items = itemsDetail.map((item: TodoItemDetail) => { return item.id });

    this.suscription = this.todoItemService.removeSelectedTodoItem(items).subscribe((response: boolean) => {
      if (response) {
        this.loadItemsDetails();
        this.clearSelectedItemData()
      }
    });

  }

  onChangeToCompleted(itemsDetail: TodoItemDetail[]) {
    const items = itemsDetail.map((item: TodoItemDetail) => { return item.id });

    this.suscription = this.todoItemService.changeSelectedItemsToComplete(items).subscribe((response: TodoItemDetail[]) => {
      if (response) {
        this.loadItemsDetails();
        this.clearSelectedItemData();
      }
    })
  }

  checkedCheckBox(event: TodoItemDetail, itemId: number): void {

    if (event) {
      this.itemSelectedFromCheckBox.push(event);
    } else {
      this.itemSelectedFromCheckBox = this.itemSelectedFromCheckBox.filter(item => item.id !== itemId);
    }
    this.itemPendingSelectedFromCheckBox = this.itemSelectedFromCheckBox.filter(item => item.isCompleted === false);

  }

  private clearSelectedItemData(): void {
    this.itemPendingSelectedFromCheckBox = [];
    this.itemSelectedFromCheckBox = [];
  }

  private loadItemsDetails(): void {

    if (this.todoListId) {
      this.suscription = this.todoItemService.getItemsByTodoList(this.todoListId).subscribe((response: TodoItemDetail[]) => {
        this.todoItems = response;
      });
    }
  }

  private loadTodoList(): void {
    if (this.todoListId) {
      this.suscription = this.todoListService.getTodoListById(this.todoListId).subscribe((response: TodoListDetail) => {
        this.todoList = response;
      })
    }

  }


}
