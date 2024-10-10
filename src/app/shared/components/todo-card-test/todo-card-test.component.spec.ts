import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCardTestComponent } from './todo-card-test.component';

describe('TodoCardTestComponent', () => {
  let component: TodoCardTestComponent;
  let fixture: ComponentFixture<TodoCardTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCardTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCardTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
