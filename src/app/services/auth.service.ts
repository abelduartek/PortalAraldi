import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  name: string;
  role: 'admin' | 'financeiro' | 'consultivo';
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly DEMO_USERS = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      name: 'Administrador',
      role: 'admin' as const,
      email: 'admin@araldi.com.br'
    },
    {
      id: 2,
      username: 'financeiro',
      password: 'financeiro',
      name: 'João Silva',
      role: 'financeiro' as const,
      email: 'joao@araldi.com.br'
    },
    {
      id: 3,
      username: 'consultivo',
      password: 'consultivo',
      name: 'Maria Santos',
      role: 'consultivo' as const,
      email: 'maria@araldi.com.br'
    }
  ];

  constructor() {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string): boolean {
    const user = this.DEMO_USERS.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      this.currentUserSubject.next(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }
}