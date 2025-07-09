import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../services/mock-data.service';
import { TipoDespesa } from '../../../models/interfaces';

@Component({
  selector: 'app-tipos-despesa',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    TableModule, 
    ButtonModule, 
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule
  ],
  templateUrl: './tipos-despesa.component.html',
  styleUrls: ['./tipos-despesa.component.css']
})
export class TiposDespesaComponent implements OnInit {
  tiposDespesa: TipoDespesa[] = [];
  showDialog = false;
  editMode = false;
  selectedTipo: TipoDespesa = this.getEmptyTipo();

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.mockDataService.getTiposDespesa().subscribe(data => {
      this.tiposDespesa = data;
    });
  }

  getEmptyTipo(): TipoDespesa {
    return {
      id: 0,
      nome: '',
      descricao: ''
    };
  }

  novoTipo() {
    this.selectedTipo = this.getEmptyTipo();
    this.editMode = false;
    this.showDialog = true;
  }

  editarTipo(tipo: TipoDespesa) {
    this.selectedTipo = { ...tipo };
    this.editMode = true;
    this.showDialog = true;
  }

  salvarTipo() {
    if (this.editMode) {
      const index = this.tiposDespesa.findIndex(t => t.id === this.selectedTipo.id);
      if (index !== -1) {
        this.tiposDespesa[index] = { ...this.selectedTipo };
      }
    } else {
      this.selectedTipo.id = Math.max(...this.tiposDespesa.map(t => t.id)) + 1;
      this.tiposDespesa.push({ ...this.selectedTipo });
    }
    this.showDialog = false;
  }

  excluirTipo(tipo: TipoDespesa) {
    if (confirm(`Deseja realmente excluir o tipo de despesa "${tipo.nome}"?`)) {
      this.tiposDespesa = this.tiposDespesa.filter(t => t.id !== tipo.id);
    }
  }
}