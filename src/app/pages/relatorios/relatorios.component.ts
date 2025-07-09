import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, DropdownModule, CalendarModule, FormsModule],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent {
  relatorios = [
    {
      id: 1,
      titulo: 'Receita x Despesa por CNPJ',
      descricao: 'Comparativo de receitas e despesas agrupado por CNPJ',
      icon: 'pi pi-chart-bar',
      categoria: 'Financeiro'
    },
    {
      id: 2,
      titulo: 'Receita por Tipo e CNPJ',
      descricao: 'Análise detalhada das receitas por tipo de venda',
      icon: 'pi pi-chart-pie',
      categoria: 'Receitas'
    },
    {
      id: 3,
      titulo: 'Despesa por Centro de Custo',
      descricao: 'Distribuição de despesas por centro de custo',
      icon: 'pi pi-chart-line',
      categoria: 'Despesas'
    },
    {
      id: 4,
      titulo: 'Despesa por Item e Quantidade',
      descricao: 'Relatório detalhado de consumo por item',
      icon: 'pi pi-list',
      categoria: 'Despesas'
    },
    {
      id: 5,
      titulo: 'Evolução de Preços por Item',
      descricao: 'Histórico de variação de preços dos itens',
      icon: 'pi pi-arrow-up-right',
      categoria: 'Análise'
    },
    {
      id: 6,
      titulo: 'Comparativo entre Fornecedores',
      descricao: 'Comparação de preços entre diferentes fornecedores',
      icon: 'pi pi-users',
      categoria: 'Análise'
    },
    {
      id: 7,
      titulo: 'Indicadores de Viabilidade',
      descricao: 'Análise de rentabilidade por produto/serviço',
      icon: 'pi pi-percentage',
      categoria: 'Estratégico'
    },
    {
      id: 8,
      titulo: 'Pagamentos sem Nota Vinculada',
      descricao: 'Pagamentos que não possuem nota fiscal associada',
      icon: 'pi pi-exclamation-triangle',
      categoria: 'Auditoria'
    }
  ];

  filtros = {
    dataInicio: null,
    dataFim: null,
    cnpj: null,
    centroCusto: null
  };

  cnpjOptions = [
    { label: 'Todos os CNPJs', value: null },
    { label: 'Araldi Pizzaria Centro', value: '12.345.678/0001-90' },
    { label: 'Araldi Pizzaria Shopping', value: '12.345.678/0002-71' },
    { label: 'Araldi Delivery', value: '12.345.678/0003-52' }
  ];

  centroCustoOptions = [
    { label: 'Todos os Centros', value: null },
    { label: 'Produção', value: 'producao' },
    { label: 'Delivery', value: 'delivery' },
    { label: 'Administrativo', value: 'administrativo' }
  ];

  gerarRelatorio(relatorio: any) {
    console.log('Gerando relatório:', relatorio.titulo);
    console.log('Filtros aplicados:', this.filtros);
  }

  exportarPDF(relatorio: any) {
    console.log('Exportando para PDF:', relatorio.titulo);
  }

  exportarExcel(relatorio: any) {
    console.log('Exportando para Excel:', relatorio.titulo);
  }

  getCategoriaColor(categoria: string): string {
    switch (categoria) {
      case 'Financeiro': return '#2196F3';
      case 'Receitas': return '#4CAF50';
      case 'Despesas': return '#f44336';
      case 'Análise': return '#FF9800';
      case 'Estratégico': return '#9C27B0';
      case 'Auditoria': return '#795548';
      default: return '#6c757d';
    }
  }
}