import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: false,
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.css'], // تم تصحيح "styleUrl" إلى "styleUrls"
})
export class DarkModeToggleComponent implements OnInit {
  isDarkMode: boolean = true;

  ngOnInit() {
    const themeInLocal = localStorage.getItem('theme');
    if (themeInLocal === 'dark') {
      this.isDarkMode = true;
      this.applyDarkMode();
    } else {
      this.isDarkMode = false;
      this.applyLightMode();
    }
  }

  changeColor() {
    if (this.isDarkMode) {
      localStorage.setItem('theme', 'light');
      this.applyLightMode();
    } else {
      localStorage.setItem('theme', 'dark');
      this.applyDarkMode();
    }
    this.isDarkMode = !this.isDarkMode;
  }

  private applyDarkMode() {
    document.documentElement.style.setProperty('--background-color', '#232522');
    document.documentElement.style.setProperty('--font-color-main', '#f7f2ef');
  }

  private applyLightMode() {
    document.documentElement.style.setProperty('--background-color', '#f7f2ef');
    document.documentElement.style.setProperty('--font-color-main', '#232522');
  }
}