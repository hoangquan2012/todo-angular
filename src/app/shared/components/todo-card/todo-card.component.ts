import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../../core/models/todo.model';
import { DialogComponent } from '../../../core/common/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

export type ITodoType = 'OPEN' | 'PROGRESS' | 'TESTING' | 'DONE';
export const ITodoStatus = ['OPEN', 'PROGRESS', 'TESTING', 'DONE'];

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input() type: ITodoType = 'OPEN';
  @Input() todo!: ITodo;

  @Output() onDeleteEvent = new EventEmitter();
  @Output() onUpdateEvent = new EventEmitter<ITodo>();

  constructor(public dialog: MatDialog) {}

  handleDelete() {
    this.onDeleteEvent.emit();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        todoDetail: this.todo,
        onSubmit: (value: ITodo) => {
          this.onUpdateEvent.emit(value);
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
