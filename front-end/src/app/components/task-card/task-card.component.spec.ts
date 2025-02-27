import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';
import { Task } from '../../models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardComponent, MatButtonModule, MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;

    component.task = {
      id: 1,
      title: 'Test Task',
      description: 'This is a test task',
      status: false,
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display task title and description', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Test Task');
    expect(compiled.querySelector('p').textContent).toContain('This is a test task');
  });

  it('should emit `taskCompleted` event when `completeTask()` is called', () => {
    spyOn(component.taskCompleted, 'emit');
    component.completeTask();
    expect(component.taskCompleted.emit).toHaveBeenCalledWith(1);
  });

  it('should call `completeTask()` when button is clicked', () => {
    spyOn(component, 'completeTask');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.completeTask).toHaveBeenCalled();
  });
});
