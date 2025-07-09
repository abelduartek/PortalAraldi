import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../services/mock-data.service';
import { CNPJ } from '../../../models/interfaces';

@Component({
  selector: 'app-cnpjs',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    TableModule, 
    ButtonModule, 
    TagModule, 
    DialogModule,
    InputTextModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './cnpjs.component.html',
  styleUrls: ['./cnpjs.component.css']
})
export class CnpjsComponent implements OnInit {
  cnpjs: CNPJ[] = [];
  showDialog = false;
  editMode = false;
  selectedCnpj: CNPJ = this.getEmptyCnpj();

  statusOptions = [
    { label: 'Ativo', value: 'ativo' },
    { label: 'Inativo', value: 'inativo' }
  ];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.mockDataService.getCNPJs().subscribe(data => {
      this.cnpjs = data;
    });
  }

  getEmptyCnpj(): CNPJ {
    return {
      id: 0,
      cnpj: '',
      nomeFantasia: '',
      razaoSocial: '',
      endereco: '',
      contaBancaria: '',
      ultimaImportacao: new Date(),
      status: 'ativo'
    };
  }

  novoCnpj() {
    this.selectedCnpj = this.getEmptyCnpj();
    this.editMode = false;
    this.showDialog = true;
  }

  editarCnpj(cnpj: CNPJ) {
    this.selectedCnpj = { ...cnpj };
    this.editMode = true;
    this.showDialog = true;
  }

  salvarCnpj() {
    if (this.editMode) {
      const index = this.cnpjs.findIndex(c => c.id === this.selectedCnpj.id);
      if (index !== -1) {
        this.cnpjs[index] = { ...this.selectedCnpj };
      }
    } else {
      this.selectedCnpj.id = Math.max(...this.cnpjs.map(c => c.id)) + 1;
      this.cnpjs.push({ ...this.selectedCnpj });
    }
    this.showDialog = false;
  }

  excluirCnpj(cnpj: CNPJ) {
    if (confirm(`Deseja realmente excluir o CNPJ ${cnpj.cnpj}?`)) {
      this.cnpjs = this.cnpjs.filter(c => c.id !== cnpj.id);
    }
  }

  getStatusSeverity(status: string): string {
    return status === 'ativo' ? 'success' : 'danger';
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
}