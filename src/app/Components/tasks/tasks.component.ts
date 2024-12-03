import { NotificationService } from './../../Services/notification.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TasksService } from '../../Services/tasks.service';
import { Task } from '../../Shared/Tasks/tasks.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  private tasksService = inject(TasksService);
  private notificationService = inject(NotificationService);
  searchSubject: Subject<string> = new Subject<string>();
  allTasks = signal<Task[]>([]);
  selectedCategory = signal<string>('');
  selectedStatus = signal<boolean | null>(null);
  searchTerm = signal<string>('');

  ngOnInit() {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.allTasks.set(tasks);
      this.tasksService.allTasks.set(this.allTasks());
    });
  }

  getUniqueCategories() {
    const categories = this.allTasks().map(task => task.category);
    return [...new Set(categories)];
  }

  getFilteredByCategory() {
    if (!this.selectedCategory()) {
      return this.allTasks();
    }
    return this.allTasks().filter(task => task.category === this.selectedCategory());
  }

  getFilteredByStatus(tasks: any[]) {
    if (this.selectedStatus() === null) {
      return tasks;
    }
    return tasks.filter(task => task.status === this.selectedStatus());
  }

  getFilteredTasks() {
    const filteredByCategory = this.getFilteredByCategory();
    const searchTerm = this.searchTerm().trim();

    if (searchTerm === '') {
      return this.getFilteredByStatus(filteredByCategory);
    }

    const filteredBySearchTerm = filteredByCategory.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return this.getFilteredByStatus(filteredBySearchTerm);
  }

  isNoTasksFound(): boolean {
    const filteredByTasks = this.getFilteredTasks();
    return filteredByTasks.length < 1 && this.searchTerm().trim() !== '';
  }

  deleteTask(taskId: number) {
    const updateTasks = this.allTasks().filter((task) => task.id !== taskId);
    this.allTasks.set(updateTasks);
    this.notificationService.showSuccess('Task Deleted');
    this.tasksService.allTasks.set(this.allTasks());

    // Update tasks on localStorage!
    localStorage.setItem('tasks', JSON.stringify(this.allTasks()))
  }

  openEditTaskDialog(task: Task) {
    if (task) {
      this.tasksService.openEditTaskDialog(task);
    }
  }
}