import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { SidebarComponent } from './app/components/layout/sidebar/sidebar.component';
import { HeaderComponent } from './app/components/layout/header/header.component';
import { AuthService } from './app/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, RouterOutlet],
  template: `
    <div class="app-layout" *ngIf="isAuthenticated">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-header></app-header>
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    <router-outlet *ngIf="!isAuthenticated"></router-outlet>
  `,
  styles: [`
    .app-layout {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .main-content {
      flex: 1;
      margin-left: 280px;
      display: flex;
      flex-direction: column;
    }

    .content-area {
      flex: 1;
      margin-top: 70px;
      overflow-y: auto;
      background: #f8f9fa;
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }
    }
  `]
})
export class App {
  constructor(private authService: AuthService) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
});