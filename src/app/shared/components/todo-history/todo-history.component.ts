import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../../core/models/todo.model';
import { HistoryService } from '../../../core/services/history.service';
import { CommonModule } from '@angular/common';
import {
  bufferCount,
  map,
  mergeMap,
  ReplaySubject,
  scan,
  switchMap,
  take,
  takeLast,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-todo-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-history.component.html',
})
export class TodoHistoryComponent implements OnInit {
  histories: ITodo[] = [];

  constructor(private todoHistoryService: HistoryService) {}

  ngOnInit() {
    this.todoHistoryService.history$
      .pipe(bufferCount(5, 1))
      .subscribe((history: any) => {
        this.histories = history;
      });
  }
}
