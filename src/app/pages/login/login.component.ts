import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {
    if (this.credentials.username && this.credentials.password) {
      this.isLoading = true;
      this.errorMessage = '';

      // Simular delay de autenticação
      setTimeout(() => {
        const isAuthenticated = this.authService.login(
          this.credentials.username, 
          this.credentials.password
        );

        this.isLoading = false;

        if (isAuthenticated) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Usuário ou senha inválidos';
        }
      }, 1000);
    }
  }
}