import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from './todo.reducer';

export const selectTodos = createFeatureSelector<Todo[]>('todos');

export const selectCompletedTodos = createSelector(selectTodos, (todos) =>
  todos.filter((todo) => todo.status)
);
