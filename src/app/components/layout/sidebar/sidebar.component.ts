import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Importação de Notas',
      icon: 'pi pi-download',
      routerLink: '/importacao-notas'
    },
    {
      label: 'Categorização',
      icon: 'pi pi-tags',
      routerLink: '/categorizacao'
    },
    {
      label: 'Controle de Itens',
      icon: 'pi pi-list',
      routerLink: '/controle-itens'
    },
    {
      label: 'Batimento Bancário',
      icon: 'pi pi-credit-card',
      routerLink: '/batimento-bancario'
    },
    {
      label: 'Relatórios',
      icon: 'pi pi-chart-bar',
      routerLink: '/relatorios'
    },
    {
      label: 'Cadastros',
      icon: 'pi pi-cog',
      items: [
        { label: 'CNPJs', routerLink: '/cadastros/cnpjs' },
        { label: 'Centros de Custo', routerLink: '/cadastros/centros-custo' },
        { label: 'Tipos de Despesa', routerLink: '/cadastros/tipos-despesa' },
        { label: 'Tipos de Receita', routerLink: '/cadastros/tipos-receita' },
        { label: 'Fornecedores', routerLink: '/cadastros/fornecedores' }
      ]
    }
  ];
}