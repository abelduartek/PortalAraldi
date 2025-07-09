import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controle-itens',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule, ChartModule, DropdownModule, FormsModule],
  templateUrl: './controle-itens.component.html',
  styleUrls: ['./controle-itens.component.css']
})
export class ControleItensComponent implements OnInit {
  itens = [
    { id: 1, nome: 'Queijo Mussarela', categoria: 'Matéria-prima', unidade: 'kg' },
    { id: 2, nome: 'Queijo Parmesão', categoria: 'Matéria-prima', unidade: 'kg' },
    { id: 3, nome: 'Pepperoni', categoria: 'Matéria-prima', unidade: 'kg' },
    { id: 4, nome: 'Presunto', categoria: 'Matéria-prima', unidade: 'kg' }
  ];

  selectedItem: any = null;
  chartData: any;
  chartOptions: any;

  ultimasCompras = [
    { data: new Date('2024-01-10'), valor: 32.50, fornecedor: 'Laticínios São Paulo' },
    { data: new Date('2024-01-05'), valor: 31.80, fornecedor: 'Laticínios São Paulo' },
    { data: new Date('2023-12-28'), valor: 33.20, fornecedor: 'Distribuidora ABC' },
    { data: new Date('2023-12-20'), valor: 32.00, fornecedor: 'Laticínios São Paulo' }
  ];

  ngOnInit() {
    this.selectedItem = this.itens[0];
    this.initChart();
  }

  initChart() {
    this.chartData = {
      labels: ['Dez/23', 'Jan/24', 'Fev/24', 'Mar/24', 'Abr/24', 'Mai/24'],
      datasets: [
        {
          label: 'Preço por kg',
          data: [32.00, 32.50, 31.80, 33.20, 32.90, 33.50],
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          tension: 0.4,
          fill: true
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Evolução de Preços'
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value: any) {
              return 'R$ ' + value.toFixed(2);
            }
          }
        }
      }
    };
  }

  onItemChange() {
    // Atualizar dados baseado no item selecionado
    console.log('Item selecionado:', this.selectedItem);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  }

  verNota(compra: any) {
    console.log('Ver nota da compra:', compra);
  }

  editarItem() {
    console.log('Editar item:', this.selectedItem);
  }
}