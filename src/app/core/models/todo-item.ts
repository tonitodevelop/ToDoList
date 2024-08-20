import { TodoDetail } from "./todo-details";

export interface TodoItem{

    title: string;
    description: string;
    isCompleted: boolean;
    todoListId: number;
}

export interface TodoItemDetail extends TodoDetail{
    
    description: string;
    isCompleted: boolean;
    todoListId: number;
    
}