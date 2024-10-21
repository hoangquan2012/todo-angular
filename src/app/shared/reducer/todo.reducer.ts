import { createReducer, on } from '@ngrx/store';
import { ITodoType } from '../components/todo-card/todo-card.component';
import { addTodo } from './todo.action';

export interface Todo {
  id?: number;
  title: string;
  description: string;
  status: ITodoType;
}

export const initialState: Todo[] = [];

const _todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { title, description, status }) => [
    ...state,
    { id: state.length + 1, title, description, status },
  ])
);

export function todoReducer(state: Todo[] = initialState, action: any) {
  return _todoReducer(state, action);
}
