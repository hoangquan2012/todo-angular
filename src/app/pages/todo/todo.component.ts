import { Component, inject, OnInit } from '@angular/core';
import {
  ITodoStatus,
  TodoCardComponent,
} from '../../shared/components/todo-card/todo-card.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITodo } from '../../core/models/todo.model';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { FilterByStatusPipe } from '../../shared/pipe/app-filter-status.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, TodoCardComponent, ReactiveFormsModule, SlidePanelComponent, FilterByStatusPipe],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todoForm!: FormGroup;
  todos: ITodo[] = [];
  filterByStatus = '';
  isSlidePanelOpen = false;
  todoId: number | null = null;
  todoStatus = ITodoStatus;
  isEdit = false;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.todoForm = this.fb.group({
      id: uuidv4(),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  time = new Date().toISOString()

  ngOnInit(): void {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  openSlidePanel() {
    this.isSlidePanelOpen = true;
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
  }

  onFilterByStatus(status: string) {
    this.filterByStatus = status;
  }

  onDelete(index: number) {
    this.todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  onUpdate(todo: ITodo) {
    const newTodos = this.todos.map(item => {
      if (item.id === todo.id) return todo;
      return item;
    })

    this.todos = newTodos;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  onSubmit() {
    this.todos.push(this.todoForm.value);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.todoForm.reset();
    this.onCloseSlidePanel();

  }
}
