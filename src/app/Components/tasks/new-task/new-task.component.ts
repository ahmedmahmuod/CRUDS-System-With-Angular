import { NotificationService } from './../../../Services/notification.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../Shared/Tasks/tasks.model';
import { TasksService } from '../../../Services/tasks.service';


@Component({
  selector: 'app-task-dialog',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
  standalone: false
})
export class TaskDialogComponent implements OnInit {
  taskForm!: FormGroup;
  private taskService = inject(TasksService);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      id: this.taskService.allTasks().length + 1,
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      date: [this.data.date || new Date(), Validators.required],
      status: [this.data.status, Validators.required],
      category: [this.data.category, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      this.dialogRef.close(task);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}