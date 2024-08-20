import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoItem, TodoItemDetail } from 'src/app/core/models/todo-item';
import { TodoListDetail } from 'src/app/core/models/todo-list';
import { TodoItemService } from 'src/app/core/services/todo-item.service';
import { TodoListService } from 'src/app/core/services/todo-list.service';

@Component({
  selector: 'app-todo-item-form',
  templateUrl: './todo-item-form.component.html',
  styleUrls: ['./todo-item-form.component.scss']
})
export class TodoItemFormComponent implements OnInit, OnDestroy {
  itemForm!: FormGroup;
  btnText = 'Guardar';
  todoList: TodoListDetail | undefined;
  @Input() todoListId: number | undefined;
  private suscription: Subscription | undefined;
  private itemId: number = 0;

  @ViewChild('itemFormDirective') private itemFormDirective: NgForm | undefined;

  constructor(private fb: FormBuilder, private todoItemService: TodoItemService, private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.loadTodoList();
    this.loadItemForm();
    this.loadTodoItemFormToEdit();
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
    this.todoItemService.setTodoItem(undefined)
  }

  get title(): AbstractControl<any, any> | null {
    return this.itemForm.get('title');
  }

  get description(): AbstractControl<any, any> | null {
    return this.itemForm.get('description');
  }

  onSubmitTodoItem(): void {
    const todoItemData: TodoItem = Object.assign({}, this.itemForm.value);
    
    if (this.todoList) {
      todoItemData.todoListId = this.todoList!.id;
      if (this.itemId > 0) {
        this.suscription =  this.todoItemService.updateTodoItem(this.itemId, todoItemData).subscribe((response: TodoItemDetail) => {
         
        });

      } else {
        this.suscription = this.todoItemService.saveTodoItem(todoItemData).subscribe((response: TodoItemDetail) => {
        });
      }
    }

    this.resetForm();
  }

  private loadItemForm(): void {

    this.itemForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      todoListId: [0],
      isCompleted: [false]
    })
  }

  private resetForm(): void {
    this.itemId = 0;
    this.btnText = 'Guardar';
    this.itemFormDirective?.resetForm({ title: '', description: '', todoListId: this.todoList?.id, isCompleted: false });
  }

  private loadTodoList(): void {
    if(this.todoListId){
      this.suscription = this.todoListService.getTodoListById(this.todoListId).subscribe((response: TodoListDetail) => {
        this.todoList = response;
      })
    }
    
  }

  private loadTodoItemFormToEdit(): void {
    this.suscription = this.todoItemService.todoItem$.subscribe((response: TodoItemDetail | undefined) => {
      if (response) {
        this.btnText = 'Actualizar';
        this.itemId = response.id;
        this.itemForm.patchValue({
          id: response.id,
          title: response.title,
          description: response.description,
          todoListId: response.todoListId,
          isCompleted: response.isCompleted
        });
      }
    })
  }

}
