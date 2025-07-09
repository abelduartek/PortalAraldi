import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { CNPJ, NotaFiscal } from '../../models/interfaces';

@Component({
  selector: 'app-importacao-notas',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule, TagModule, DialogModule, RouterModule],
  templateUrl: './importacao-notas.component.html',
  styleUrls: ['./importacao-notas.component.css']
})
export class ImportacaoNotasComponent implements OnInit {
  cnpjs: CNPJ[] = [];
  notasFiscais: NotaFiscal[] = [];
  selectedNota: NotaFiscal | null = null;
  showNotaDialog = false;
  expandedRows: any = {};

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.mockDataService.getCNPJs().subscribe(data => {
      this.cnpjs = data.sort((a, b) => 
        new Date(b.ultimaImportacao).getTime() - new Date(a.ultimaImportacao).getTime()
      );
    });

    this.mockDataService.getNotasFiscais().subscribe(data => {
      this.notasFiscais = data;
    });
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'ativo': return 'success';
      case 'inativo': return 'danger';
      default: return 'info';
    }
  }

  getNotaStatusSeverity(status: string): string {
    switch (status) {
      case 'importada': return 'success';
      case 'erro': return 'danger';
      case 'pendente_categorizacao': return 'warning';
      default: return 'info';
    }
  }

  getNotaStatusLabel(status: string): string {
    switch (status) {
      case 'importada': return 'Importada';
      case 'erro': return 'Com Erro';
      case 'pendente_categorizacao': return 'Pendente Categorização';
      default: return status;
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }

  verNota(nota: NotaFiscal) {
    this.selectedNota = nota;
    this.showNotaDialog = true;
  }

  configurarCNPJ(cnpj: CNPJ) {
    // Implementar configuração do CNPJ
    console.log('Configurar CNPJ:', cnpj);
  }

  verHistorico(cnpj: CNPJ) {
    // Implementar visualização do histórico
    console.log('Ver histórico:', cnpj);
  }

  importarNotas() {
    // Implementar importação de notas
    console.log('Importar notas');
  }

  hasItemsPendentes(nota: NotaFiscal): boolean {
    return nota.itens.some(item => !item.categorizado);
  }
}