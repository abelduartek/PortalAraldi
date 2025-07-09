import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipsModule } from 'primeng/chips';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../services/mock-data.service';
import { Fornecedor } from '../../../models/interfaces';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    TableModule, 
    ButtonModule, 
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ChipsModule,
    FormsModule
  ],
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  showDialog = false;
  editMode = false;
  selectedFornecedor: Fornecedor = this.getEmptyFornecedor();

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.mockDataService.getFornecedores().subscribe(data => {
      this.fornecedores = data;
    });
  }

  getEmptyFornecedor(): Fornecedor {
    return {
      id: 0,
      cnpj: '',
      razaoSocial: '',
      endereco: '',
      telefone: '',
      email: '',
      itensRelacionados: []
    };
  }

  novoFornecedor() {
    this.selectedFornecedor = this.getEmptyFornecedor();
    this.editMode = false;
    this.showDialog = true;
  }

  editarFornecedor(fornecedor: Fornecedor) {
    this.selectedFornecedor = { ...fornecedor };
    this.editMode = true;
    this.showDialog = true;
  }

  salvarFornecedor() {
    if (this.editMode) {
      const index = this.fornecedores.findIndex(f => f.id === this.selectedFornecedor.id);
      if (index !== -1) {
        this.fornecedores[index] = { ...this.selectedFornecedor };
      }
    } else {
      this.selectedFornecedor.id = Math.max(...this.fornecedores.map(f => f.id)) + 1;
      this.fornecedores.push({ ...this.selectedFornecedor });
    }
    this.showDialog = false;
  }

  excluirFornecedor(fornecedor: Fornecedor) {
    if (confirm(`Deseja realmente excluir o fornecedor "${fornecedor.razaoSocial}"?`)) {
      this.fornecedores = this.fornecedores.filter(f => f.id !== fornecedor.id);
    }
  }

  verHistorico(fornecedor: Fornecedor) {
    console.log('Ver histórico do fornecedor:', fornecedor);
  }
}