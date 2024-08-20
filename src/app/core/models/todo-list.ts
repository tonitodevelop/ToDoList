import { TodoDetail } from "./todo-details";
import { TodoItemDetail } from "./todo-item";

export interface TodoList{
    title: string;
    userId: number;
}

export interface TodoListDetail extends TodoDetail{
    
    userId: number;
    items?: TodoItemDetail[];
}