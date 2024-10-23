import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { FormSearchComponent } from '../../core/common/form-search/form-search.component';
import { ITodo } from '../../core/models/todo.model';
import { AuthService } from '../../core/services/auth.service';
import { HistoryService } from '../../core/services/history.service';
import { TodoService } from '../../core/services/todo.service';
import {
  ITodoStatus,
  TodoCardComponent,
} from '../../shared/components/todo-card/todo-card.component';
import { TodoHistoryComponent } from '../../shared/components/todo-history/todo-history.component';
import { FilterByStatusPipe } from '../../shared/pipe/app-filter-status.pipe';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    TodoCardComponent,
    ReactiveFormsModule,
    SlidePanelComponent,
    FilterByStatusPipe,
    FormSearchComponent,
    TodoHistoryComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  todoForm!: FormGroup;
  todos: ITodo[] = [];
  filterByStatus = '';
  isSlidePanelOpen = false;
  todoId: number | null = null;
  todoStatus = ITodoStatus;
  isEdit = false;
  @ViewChild('inputElement') inputElement!: ElementRef;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService,
    private todoService: TodoService,
    private todoHistoryService: HistoryService
  ) {
    this.todoForm = this.fb.group({
      id: uuidv4(),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  time = new Date().toISOString();

  ngOnInit(): void {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);

      this.todos.forEach((todo) => {
        this.todoHistoryService.addHistory(todo);
      });
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
    const newTodos = this.todos.map((item) => {
      if (item.id === todo.id) return todo;
      return item;
    });

    this.todos = newTodos;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  onSubmit() {
    if (this.todoForm.invalid) return;
    this.todos.push(this.todoForm.value);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.todoHistoryService.addHistory(this.todoForm.value);
    this.todoForm.reset();
    this.onCloseSlidePanel();
  }

  logInputValue() {
    this.authService.getProfile().subscribe();
    this.authService.getProfile1().subscribe();
  }

  onSearch(value: any): void {
    const searchTerm = value.toLowerCase();
    if (!searchTerm) {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
    } else {
      this.todos = this.todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchTerm) ||
          todo.description.toLowerCase().includes(searchTerm)
      );
    }
  }
}
