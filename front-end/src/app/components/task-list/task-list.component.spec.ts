import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasks', 'markAsCompleted']);

    await TestBed.configureTestingModule({
      imports: [TaskListComponent, HttpClientTestingModule],
      providers: [{ provide: TaskService, useValue: taskServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No Pending Tasks" when tasks list is empty', () => {
    taskService.getTasks.and.returnValue(of([]));
    component.loadTasks();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('No Pending Tasks');
  });

  it('should display "Latest Tasks" when there are tasks', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: false },
      { id: 2, title: 'Task 2', description: 'Description 2', status: false },
    ];

    taskService.getTasks.and.returnValue(of(mockTasks));
    component.tasks.set(mockTasks);
    component.loadTasks();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Latest Tasks');
    expect(compiled.querySelectorAll('app-task-card').length).toBe(2);
  });

});
