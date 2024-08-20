import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TodoItem, TodoItemDetail } from '../models/todo-item';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  private baseUrl = environment.API_URL + 'todolistitem';
  private todoItems: BehaviorSubject<TodoItemDetail[]> = new BehaviorSubject<TodoItemDetail[]>([]);
  private todoItem: BehaviorSubject<TodoItemDetail | undefined> = new BehaviorSubject<TodoItemDetail | undefined>(undefined);

  constructor(private http: HttpClient) { }

  get todoItem$(): Observable<TodoItemDetail | undefined>{
    return this.todoItem.asObservable();
  }
  get todoItems$(): Observable<TodoItemDetail[]>{
    return this.todoItems.asObservable();
  }

  setTodoItem(value: TodoItemDetail | undefined): void {
    this.todoItem.next(value);
  }

  addTodoItem(value: TodoItemDetail): void{
    let values = this.todoItems.getValue();
    this.setTodoItems([...values, value]);
  }
  
  setTodoItems(values: TodoItemDetail[]): void{   
    this.todoItems.next(values);
  }
  
  saveTodoItem(todoItem: TodoItem): Observable<TodoItemDetail>{
    return this.http.post<TodoItemDetail>(`${this.baseUrl}`, todoItem).pipe(
      
      map((item: TodoItemDetail) => {
        
        this.addTodoItem(item);
        return item;
      })
    );
  }

  updateTodoItem(id: number, todoItem: TodoItem): Observable<TodoItemDetail>{
    return this.http.put<TodoItemDetail>(`${this.baseUrl}/${id}`, todoItem).pipe(
      map((item: TodoItemDetail) => {
        this.addTodoItem(item);
        return item;
      })
    );
  }

  getItemById(itemId: number): Observable<TodoItemDetail>{
    return this.http.get<TodoItemDetail>(`${this.baseUrl}/${itemId}`);
  }

  getItemsByTodoList(todoListId: number): Observable<TodoItemDetail[]>{
    return this.http.get<TodoItemDetail[]>(`${this.baseUrl}/todolist/${todoListId}`);
  }

  removeSelectedTodoItem(itemsId: number[]) : Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}/remove/`, itemsId)
  }

  changeItemToComplete(itemId: number, isCompleted: boolean): Observable<TodoItemDetail>{
    return this.http.put<TodoItemDetail>(`${this.baseUrl}/completed/${itemId}`, isCompleted);
  }
  
  changeSelectedItemsToComplete(itemsId: number[]): Observable<TodoItemDetail[]>{
    return this.http.post<TodoItemDetail[]>(`${this.baseUrl}/completed/`, itemsId);
  }
}
