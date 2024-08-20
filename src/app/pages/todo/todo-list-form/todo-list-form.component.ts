import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TodoList, TodoListDetail } from 'src/app/core/models/todo-list';
import { TodoListService } from 'src/app/core/services/todo-list.service';

@Component({
  selector: 'app-todo-list-form',
  templateUrl: './todo-list-form.component.html',
  styleUrls: ['./todo-list-form.component.scss']
})
export class TodoListFormComponent implements OnInit, OnDestroy {
  todoListForm!: FormGroup;
  @ViewChild('todoListFormDirective') private todoListFormDirective!: NgForm;
  btnText: string = 'Guardar';
  @Input() userId: number | undefined;
  private suscription: Subscription | undefined;
  private todoListId: number = 0;

  constructor(private fb: FormBuilder, private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.loadTodoListForm();
    this.loadTodoListFormToEdit();
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
    this.todoListService.setTodoList(undefined);
  }

  onSubmitList(): void {
    const todoListData: TodoList = Object.assign({}, this.todoListForm.value);
    if (this.todoListId > 0) {
      this.suscription = this.todoListService.updateTodoList(this.todoListId, todoListData).subscribe((response: TodoListDetail) => {
        this.todoListService.addTodoList(response)
      })
    } else {
      this.suscription = this.todoListService.saveTodoList(todoListData).subscribe((response: TodoListDetail) => {
        this.todoListService.addTodoList(response);
      })
    }
    this.resetForm();
  }

  private loadTodoListForm(): void {
    this.todoListForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required]],
      userId: [this.userId]
    });
  }

  get title(): AbstractControl<any, any> | null {
    return this.todoListForm.get('title');
  }

  private loadTodoListFormToEdit(): void {
    this.suscription = this.todoListService.todoList$.subscribe((response: TodoListDetail | undefined) => {
      if (response) {
        this.btnText = 'Actualizar';
        this.todoListId = response.id;
        this.todoListForm.patchValue({ id: response.id, title: response.title, userId: response.userId });
      }
    })

  }

  private resetForm(): void {
    this.todoListId = 0;
    this.todoListFormDirective.resetForm({ id: 0, title: '', userId: this.userId });
    this.btnText = 'Guardar';
  }
}
