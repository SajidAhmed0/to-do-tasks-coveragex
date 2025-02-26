import { Component, Signal, computed, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  private taskService = new TaskService();

  title = signal('');
  description = signal('');

  canSubmit: Signal<boolean> = computed(() => this.title().trim() !== '' && this.description().trim() !== '');

  addTask() {
    if (this.canSubmit()) {
      const newTask: Task = { title: this.title(), description: this.description() };
      this.taskService.createTask(newTask).subscribe(() => {
        this.title.set('');
        this.description.set('');
        window.location.reload();
      });
    }
  }
}
