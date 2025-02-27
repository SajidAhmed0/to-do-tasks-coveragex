import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Task } from '../models/task.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, NoopAnimationsModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks from API', () => {
    const dummyTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: false },
      { id: 2, title: 'Task 2', description: 'Description 2', status: false },
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });

  it('should create a new task', () => {
    const newTask: Task = { title: 'New Task', description: 'New Description' };

    service.createTask(newTask).subscribe((task) => {
      expect(task.title).toBe('New Task');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/tasks');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 1, ...newTask });
  });

  it('should mark a task as completed', () => {
    const taskId = 1;
    service.markAsCompleted(taskId).subscribe((task) => {
      expect(task.status).toBe(true);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/tasks/${taskId}/complete`);
    expect(req.request.method).toBe('PUT');
    req.flush({ id: taskId, title: 'Task 1', description: 'Description 1', status: true });
  });
});
