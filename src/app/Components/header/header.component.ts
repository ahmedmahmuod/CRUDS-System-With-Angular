import { Component, inject } from '@angular/core';
import { TasksService } from '../../Services/tasks.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  taskService = inject(TasksService);
}
