import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSubject = new BehaviorSubject<ITodo[]>([]);
  todos$: Observable<ITodo[]> = this.todosSubject.asObservable();

  constructor() {
    const todos = localStorage.getItem('todos') || '';
    this.todosSubject.next(JSON.parse(todos))
    console.log('---', todos);
  }
  
}
