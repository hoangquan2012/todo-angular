import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-search.component.html',
  styleUrl: './form-search.component.scss',
})
export class FormSearchComponent {
  searchControl = new FormControl('');
}
