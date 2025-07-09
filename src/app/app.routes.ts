import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'importacao-notas',
    loadComponent: () => import('./pages/importacao-notas/importacao-notas.component').then(m => m.ImportacaoNotasComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'categorizacao',
    loadComponent: () => import('./pages/categorizacao/categorizacao.component').then(m => m.CategorizacaoComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'controle-itens',
    loadComponent: () => import('./pages/controle-itens/controle-itens.component').then(m => m.ControleItensComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'batimento-bancario',
    loadComponent: () => import('./pages/batimento-bancario/batimento-bancario.component').then(m => m.BatimentoBancarioComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'relatorios',
    loadComponent: () => import('./pages/relatorios/relatorios.component').then(m => m.RelatoriosComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastros/cnpjs',
    loadComponent: () => import('./pages/cadastros/cnpjs/cnpjs.component').then(m => m.CnpjsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastros/centros-custo',
    loadComponent: () => import('./pages/cadastros/centros-custo/centros-custo.component').then(m => m.CentrosCustoComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastros/tipos-despesa',
    loadComponent: () => import('./pages/cadastros/tipos-despesa/tipos-despesa.component').then(m => m.TiposDespesaComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastros/tipos-receita',
    loadComponent: () => import('./pages/cadastros/tipos-receita/tipos-receita.component').then(m => m.TiposReceitaComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastros/fornecedores',
    loadComponent: () => import('./pages/cadastros/fornecedores/fornecedores.component').then(m => m.FornecedoresComponent),
    canActivate: [AuthGuard]
  }
];