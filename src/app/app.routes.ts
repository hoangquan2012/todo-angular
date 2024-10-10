import { Routes } from '@angular/router';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { LoginComponent } from './pages/login/login.component';
import { MasterComponent } from './shared/layouts/master/master.component';
import { TodoComponent } from './pages/todo/todo.component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';
import { TodoTestComponent } from './pages/todo-test/todo-test.component';

export const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        canActivate: [guestGuard],
        children: [{ path: '', component: LoginComponent }]
    },
    {
        path: '',
        component: MasterComponent,
        canActivate: [authGuard],
        children: [{ path: 'todo', component: TodoComponent },{ path: 'todo-test', component: TodoTestComponent }]
    },
];
