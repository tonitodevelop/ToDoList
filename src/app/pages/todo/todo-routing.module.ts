import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListSettingsComponent } from './todo-list-settings/todo-list-settings.component';

const routes: Routes = [
  { path: '', component: TodoListComponent},
  { path: 'list/:id', component: TodoListSettingsComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
