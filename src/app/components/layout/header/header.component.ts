import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('userMenu') userMenu!: Menu;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  userMenuItems: MenuItem[] = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => this.verPerfil()
    },
    {
      label: 'Configurações',
      icon: 'pi pi-cog',
      command: () => this.abrirConfiguracoes()
    },
    {
      separator: true
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];

  currentUser = {
    name: 'João Silva',
    role: 'Financeiro',
  };

  getUserInitials(): string {
    const names = this.currentUser.name.split(' ');
    if (names.length >= 2) {
      return names[0].charAt(0) + names[names.length - 1].charAt(0);
    }
    return names[0].charAt(0) + names[0].charAt(1);
  }

  toggleMenu(event: Event) {
    this.userMenu.toggle(event);
  }

  verPerfil() {
    console.log('Abrir perfil do usuário');
    // Implementar navegação para perfil se necessário
    // this.router.navigate(['/perfil']);
  }

  abrirConfiguracoes() {
    console.log('Abrir configurações');
    // Implementar navegação para configurações se necessário
    // this.router.navigate(['/configuracoes']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}