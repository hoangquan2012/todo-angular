import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-form-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-search.component.html',
  styleUrl: './form-search.component.scss',
})
export class FormSearchComponent {
  searchControl = new FormControl('');
  @Output() searchTermEmitter = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged() // Chỉ tiếp tục khi giá trị thay đổi
      )
      .subscribe((searchTerm) => {
        this.searchTermEmitter.emit(searchTerm ?? '');
      });
  }
}
