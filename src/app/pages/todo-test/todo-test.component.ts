import { Component } from '@angular/core';
import { TodoCardTestComponent } from '../../shared/components/todo-card-test/todo-card-test.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import { ITodo } from '../../core/models/todo.model';
import { ITodoStatus } from '../../shared/components/todo-card/todo-card.component';

@Component({
  selector: 'app-todo-test',
  standalone: true,
  imports: [TodoCardTestComponent, ReactiveFormsModule, SlidePanelComponent],
  templateUrl: './todo-test.component.html',
  styleUrl: './todo-test.component.scss',
})
export class TodoTestComponent {
  // todoForm!: FormGroup;
  todos: ITodo[] = [];
  filterByStatus = '';
  isSlidePanelOpen = false;
  todoId: number | null = null;
  todoStatus = ITodoStatus;

  todoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('OPEN', [Validators.required]),
  });

  // constructor(private fb: FormBuilder) {
  //   this.todoForm = this.fb.group({
  //     title: new FormControl('', [Validators.required]),
  //     description: new FormControl('', [Validators.required]),
  //     status: new FormControl('OPEN', [Validators.required]),
  //   });
  // }

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

  onDelete(id: number) {
    const index = this.todos.findIndex((item) => item.id === id);
    this.todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  onSubmit() {
    this.todos.push(this.todoForm?.value as ITodo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.todoForm.reset();
    this.onCloseSlidePanel();
    console.log(this.todos);
  }
}
