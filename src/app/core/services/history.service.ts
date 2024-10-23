import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ITodo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private historySubject = new ReplaySubject<ITodo>(5);
  
  history$ = this.historySubject.asObservable();
  
  addHistory(todo: ITodo) {
    this.historySubject.next(todo);
  }
}
