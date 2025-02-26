import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Task } from '../models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  private http = inject(HttpClient);

  private snackBar = inject(MatSnackBar);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(() => this.showMessage('Task added successfully!', 'success'))
    );
  }

  markAsCompleted(id: number): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}/complete`, {}).pipe(
      tap(() => this.showMessage('Task marked as completed!', 'info'))
    );
  }

  private showMessage(message: string, type: 'success' | 'info' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: `snackbar-${type}`,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}

