import { createAction, props } from '@ngrx/store';
import { ITodoType } from '../components/todo-card/todo-card.component';

export const addTodo = createAction(
  'addTodoList',
  props<{ title: string; description: string; status: ITodoType }>()
);
