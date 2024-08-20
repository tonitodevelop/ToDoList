import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoList, TodoListDetail } from '../models/todo-list';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private baseUrl = environment.API_URL + 'todolist';
  private todoList: BehaviorSubject<TodoListDetail | undefined> = new BehaviorSubject<TodoListDetail | undefined>(undefined);
  private todoListAll: BehaviorSubject<TodoListDetail[]> = new BehaviorSubject<TodoListDetail[]>([]);

  constructor(private http: HttpClient) { }

  get todoList$(): Observable<TodoListDetail | undefined>{
    return this.todoList.asObservable();
  }

  setTodoList(value: TodoListDetail | undefined): void{
    this.todoList.next(value);
  }

  get todoListAll$(): Observable<TodoListDetail[]> {
    return this.todoListAll.asObservable();
  }

  addTodoList(value: TodoListDetail): void {
    let values = this.todoListAll.getValue();
    this.setTodoListAll([...values,value]);
  }
  
  setTodoListAll(value: TodoListDetail[]): void{    
    this.todoListAll.next(value);
  }

  saveTodoList(todoList: TodoList): Observable<TodoListDetail>{
    return this.http.post<TodoListDetail>(this.baseUrl, todoList);
  }

  updateTodoList(id: number, todoList: TodoList): Observable<TodoListDetail>{
    return this.http.put<TodoListDetail>(`${this.baseUrl}/${id}`,todoList);
  }

  getAllTodoListByUserId(userId: number): Observable<TodoListDetail[]>{
    return this.http.get<TodoListDetail[]>(`${this.baseUrl}/listbyuser/${userId}`);
  }

  getTodoListById(id: number): Observable<TodoListDetail>{
    return this.http.get<TodoListDetail>(`${this.baseUrl}/${id}`);
  }

  removeSelectedTodoList(listId: number[]) : Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}/remove/`, listId)
  }
}
