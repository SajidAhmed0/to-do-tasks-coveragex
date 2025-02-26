import { Component, OnInit, Signal, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, NgIf],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  private taskService = new TaskService();
  tasks = signal<Task[]>([]);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      console.log(data)
      if(data == null){
        this.tasks.set([])
      }else{
        this.tasks.set(data)
      }
    }
  );
  }

  markAsDone(id: number) {
    this.taskService.markAsCompleted(id).subscribe(() => {
      // this.tasks.set(this.tasks().filter((task) => task.id !== id));
      this.loadTasks();
    });
  }
}
