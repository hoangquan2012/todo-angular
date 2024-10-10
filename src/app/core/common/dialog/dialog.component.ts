import { Component, inject, model } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ITodo } from '../../models/todo.model';
import { TodoCardComponent } from '../../../shared/components/todo-card/todo-card.component';
import { TodoComponent } from '../../../pages/todo/todo.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  dialogForm!: FormGroup;
  readonly data = inject<{
    todoDetail: ITodo,
    onSubmit: (value: ITodo) => void
  }>(MAT_DIALOG_DATA);

  constructor(private fb: FormBuilder) {
    this.dialogForm = this.fb.group({
      id: new FormControl(this.data.todoDetail.id, [Validators.required]),
      title: new FormControl(this.data.todoDetail.title, [Validators.required]),
      description: new FormControl(this.data.todoDetail.description, [
        Validators.required,
      ]),
      status: new FormControl(this.data.todoDetail.status, [Validators.required]),
    });
  }

  onSubmit() {
    this.data.onSubmit(this.dialogForm.value)
  }
}
