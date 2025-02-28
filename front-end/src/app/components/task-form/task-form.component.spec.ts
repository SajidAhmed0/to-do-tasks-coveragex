import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['createTask']);

    await TestBed.configureTestingModule({
      imports: [
        TaskFormComponent, 
        FormsModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatButtonModule, 
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [{ provide: TaskService, useValue: taskServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render form elements', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Create a Task');
    expect(compiled.querySelector('input[matInput]')).toBeTruthy();
    expect(compiled.querySelector('textarea[matInput]')).toBeTruthy();
    expect(compiled.querySelector('button[mat-raised-button]')).toBeTruthy();
  });

  it('should disable submit button when title and description are empty', () => {
    component.title.set('');
    component.description.set('');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });

  it('should enable submit button when title and description are filled', () => {
    component.title.set('New Task');
    component.description.set('Task Description');
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalsy();
  });

});
