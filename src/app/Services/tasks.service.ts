import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../Shared/Tasks/tasks.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../Components/tasks/new-task/new-task.component';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationService)

  allTasks = signal<Task[]>([]);

  // Get all Tasks
  getTasks(): Observable<Task[]> {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      const paresdTask = JSON.parse(tasks);
      this.allTasks.set(paresdTask);
      return of(paresdTask);

    } else {
      return of([]);
    }
  }

  // Save tasks to localStorage
  private saveTasksToLocalStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // @@open dialog and edit the task.@@@
  openEditTaskDialog(taskData: Task) {
    const allTasks = this.allTasks();
    const dialog = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      disableClose: false,
      panelClass: 'dialog-overlay',
      data: { ...taskData },
    });

    const dataNew = allTasks.find((task) => task.id === taskData.id);
    dialog.afterClosed().subscribe(result => {
      if (dataNew && result) {
        const updatedResult = { ...result, id: dataNew.id };
        const index = allTasks.findIndex(task => task.id === dataNew.id);
        if (index !== -1) {
          allTasks[index] = updatedResult;

          // Save task update in local storage
          this.saveTasksToLocalStorage(allTasks);

          // Show notification after edited the task
          this.notificationService.showSuccess('Task Edited Successfully!');
        }
      }
    });
  }

  // Open diaglog to add new task
  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      disableClose: false,
      panelClass: 'dialog-overlay',
      data: { id: 0, title: '', description: '', status: 'Pending', date: '', category: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allTasks().unshift(result);

        // Save new tasks added in local storage
        this.saveTasksToLocalStorage(this.allTasks())

        // Show notification after add the task
        this.notificationService.showSuccess('Task Added Successfully!');
      }
    })
  }
}
