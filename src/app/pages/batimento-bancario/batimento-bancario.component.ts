import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-batimento-bancario',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule, TagModule, FileUploadModule],
  templateUrl: './batimento-bancario.component.html',
  styleUrls: ['./batimento-bancario.component.css']
})
export class BatimentoBancarioComponent {
  batimentos = [
    {
      cnpj: '12.345.678/0001-90',
      nomeFantasia: 'Araldi Pizzaria Centro',
      totalNotas: 15,
      totalPagamentos: 13,
      valorNotas: 45680.50,
      valorPagamentos: 42150.30,
      status: 'divergente'
    },
    {
      cnpj: '12.345.678/0002-71',
      nomeFantasia: 'Araldi Pizzaria Shopping',
      totalNotas: 8,
      totalPagamentos: 8,
      valorNotas: 23450.75,
      valorPagamentos: 23450.75,
      status: 'batida'
    },
    {
      cnpj: '12.345.678/0003-52',
      nomeFantasia: 'Araldi Delivery',
      totalNotas: 12,
      totalPagamentos: 10,
      valorNotas: 18920.40,
      valorPagamentos: 15680.20,
      status: 'pendente'
    }
  ];

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'batida': return 'success';
      case 'divergente': return 'danger';
      case 'pendente': return 'warning';
      default: return 'info';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'batida': return 'Batida';
      case 'divergente': return 'Divergente';
      case 'pendente': return 'Pendente';
      default: return status;
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  onUpload(event: any) {
    console.log('Arquivo CNAB carregado:', event.files);
  }

  processarBatimento(cnpj: string) {
    console.log('Processar batimento para:', cnpj);
  }

  verDetalhes(cnpj: string) {
    console.log('Ver detalhes do batimento:', cnpj);
  }
}