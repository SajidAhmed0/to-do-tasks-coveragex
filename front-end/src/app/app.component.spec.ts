import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-task-form',
  template: '<div></div>',
})
class MockTaskFormComponent {}

@Component({
  selector: 'app-task-list',
  template: '<div></div>',
})

class MockTaskListComponent {
  loadTasks = jasmine.createSpy('loadTasks');
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  // let mockTaskList: jasmine.SpyObj<MockTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HttpClientTestingModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      declarations: [MockTaskFormComponent, MockTaskListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    
    // mockTaskList = jasmine.createSpyObj<TaskListComponent>('TaskListComponent', ['loadTasks']);
        
    // component.taskList = mockTaskList;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('To-Do Tasks ✅');
  });

  // it('should call `reloadTaskList` when a task is added', () => {
  //   component.reloadTaskList();
  //   expect(mockTaskList.loadTasks).toHaveBeenCalled();
  // });
});
