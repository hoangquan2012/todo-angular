import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TodoTestComponent } from '../../../pages/todo-test/todo-test.component';
import { ITodoType } from '../todo-card/todo-card.component';
import { ITodo } from '../../../core/models/todo.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-card-test',
  standalone: true,
  imports: [],
  templateUrl: './todo-card-test.component.html',
  styleUrl: './todo-card-test.component.scss',
})
export class TodoCardTestComponent {
  @Input() type: ITodoType = 'OPEN';
  @Input() todo!: ITodo;


  // private todoTestComponent = new TodoTestComponent()

  constructor(private todoTestComponent: TodoTestComponent) {}

  handleDelete(): void {
      this.todoTestComponent.onDelete(this.todo.id as number)
  }
}
