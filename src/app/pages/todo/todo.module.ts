import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { TodoListFormComponent } from './todo-list-form/todo-list-form.component';
import { TodoListDetailsComponent } from './todo-list-details/todo-list-details.component';
import { TodoListSettingsComponent } from './todo-list-settings/todo-list-settings.component';
import { TodoItemFormComponent } from './todo-item-form/todo-item-form.component';
import { TodoItemDetailsComponent } from './todo-item-details/todo-item-details.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    TodoListComponent,
    TodoListFormComponent,
    TodoListDetailsComponent,
    TodoListSettingsComponent,
    TodoItemFormComponent,
    TodoItemDetailsComponent
  ],
  providers: [
    
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
]
})
export class TodoModule { }
