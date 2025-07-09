import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../services/mock-data.service';
import { DashboardData } from '../../models/interfaces';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    ChartModule, 
    ButtonModule, 
    TagModule,
    DropdownModule,
    CalendarModule,
    SelectButtonModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData!: DashboardData;
  chartData: any;
  chartOptions: any;
  
  filters = {
    dataInicio: null as Date | null,
    dataFim: null as Date | null,
    cnpj: null,
    tipoReceita: null,
    centroCusto: null
  };

  cnpjOptions = [
    { label: 'Todos os CNPJs', value: null },
    { label: 'Araldi Pizzaria Centro', value: '12.345.678/0001-90' },
    { label: 'Araldi Pizzaria Shopping', value: '12.345.678/0002-71' },
    { label: 'Araldi Delivery', value: '12.345.678/0003-52' }
  ];

  receitaOptions = [
    { label: 'Todos os tipos', value: null },
    { label: 'Rodízio', value: 'rodizio' },
    { label: 'Delivery', value: 'delivery' },
    { label: 'Eventos', value: 'eventos' }
  ];

  centroCustoOptions = [
    { label: 'Todos os centros', value: null },
    { label: 'Produção', value: 'producao' },
    { label: 'Delivery', value: 'delivery' },
    { label: 'Administrativo', value: 'administrativo' }
  ];

  chartViewOptions = [
    { label: 'Mensal', value: 'monthly' },
    { label: 'YoY', value: 'yoy' }
  ];

  selectedChartView = 'monthly';

  quickPeriods = [
    { label: 'Hoje', value: 'today' },
    { label: 'Esta Semana', value: 'thisWeek' },
    { label: 'Este Mês', value: 'thisMonth' },
    { label: 'Últimos 30 dias', value: 'last30Days' },
    { label: 'Este Ano', value: 'thisYear' }
  ];

  selectedQuickPeriod = 'thisMonth';

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.loadDashboardData();
    this.initChart();
    this.setDefaultDateRange();
  }

  setDefaultDateRange() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    this.filters.dataInicio = firstDayOfMonth;
    this.filters.dataFim = lastDayOfMonth;
  }

  selectQuickPeriod(period: string) {
    this.selectedQuickPeriod = period;
    const today = new Date();
    
    switch (period) {
      case 'today':
        this.filters.dataInicio = new Date(today);
        this.filters.dataFim = new Date(today);
        break;
      case 'thisWeek':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
        this.filters.dataInicio = startOfWeek;
        this.filters.dataFim = endOfWeek;
        break;
      case 'thisMonth':
        this.filters.dataInicio = new Date(today.getFullYear(), today.getMonth(), 1);
        this.filters.dataFim = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'last30Days':
        this.filters.dataInicio = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
        this.filters.dataFim = new Date(today);
        break;
      case 'thisYear':
        this.filters.dataInicio = new Date(today.getFullYear(), 0, 1);
        this.filters.dataFim = new Date(today.getFullYear(), 11, 31);
        break;
    }
    
    this.applyFilters();
  }

  onDateChange() {
    this.selectedQuickPeriod = '';
    this.applyFilters();
  }

  loadDashboardData() {
    this.mockDataService.getDashboardData().subscribe(data => {
      this.dashboardData = data;
      this.updateChartData();
    });
  }

  applyFilters() {
    console.log('Aplicando filtros:', this.filters);
    // Aqui você faria a chamada para o backend com os filtros aplicados
    this.loadDashboardData();
  }

  clearFilters() {
    this.filters = {
      dataInicio: null,
      dataFim: null,
      cnpj: null,
      tipoReceita: null,
      centroCusto: null
    };
    this.setDefaultDateRange();
    this.applyFilters();
  }

  updateChartView() {
    this.updateChartData();
  }

  initChart() {
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: this.getChartTitle()
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value: any) {
              return 'R$ ' + value.toLocaleString('pt-BR');
            }
          }
        }
      }
    };
  }

  getChartTitle(): string {
    return this.selectedChartView === 'yoy' 
      ? 'Comparativo Ano a Ano - Resultado Líquido'
      : 'Evolução Mensal - Resultado Líquido';
  }

  updateChartData() {
    if (this.dashboardData) {
      if (this.selectedChartView === 'yoy') {
        this.updateYoYChartData();
      } else {
        this.updateMonthlyChartData();
      }
      
      // Atualizar título do gráfico
      if (this.chartOptions && this.chartOptions.plugins && this.chartOptions.plugins.title) {
        this.chartOptions.plugins.title.text = this.getChartTitle();
      }
    }
  }

  updateMonthlyChartData() {
    this.chartData = {
      labels: this.dashboardData.evolucaoResultado.map(item => item.mes),
      datasets: [
        {
          label: 'Resultado Líquido',
          data: this.dashboardData.evolucaoResultado.map(item => item.valor),
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  }

  updateYoYChartData() {
    // Dados simulados para comparação YoY
    const currentYearData = [89260.45, 95420.30, 87650.20, 102340.15, 98750.60, 105890.25];
    const previousYearData = [82150.30, 88920.15, 91200.45, 95680.20, 89340.75, 98450.60];
    
    this.chartData = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [
        {
          label: '2024',
          data: currentYearData,
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          tension: 0.4,
          fill: false
        },
        {
          label: '2023',
          data: previousYearData,
          borderColor: '#FFA726',
          backgroundColor: 'rgba(255, 167, 38, 0.2)',
          tension: 0.4,
          fill: false
        }
      ]
    };
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  getAlertSeverity(alert: string): string {
    if (alert.includes('pendentes')) return 'warning';
    if (alert.includes('sem nota')) return 'danger';
    if (alert.includes('acima da média')) return 'info';
    return 'info';
  }
}