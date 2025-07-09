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
import { TipoReceita } from '../../../models/interfaces';

@Component({
  selector: 'app-tipos-receita',
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
  templateUrl: './tipos-receita.component.html',
  styleUrls: ['./tipos-receita.component.css']
})
export class TiposReceitaComponent implements OnInit {
  tiposReceita: TipoReceita[] = [];
  showDialog = false;
  editMode = false;
  selectedTipo: TipoReceita = this.getEmptyTipo();

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.mockDataService.getTiposReceita().subscribe(data => {
      this.tiposReceita = data;
    });
  }

  getEmptyTipo(): TipoReceita {
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

  editarTipo(tipo: TipoReceita) {
    this.selectedTipo = { ...tipo };
    this.editMode = true;
    this.showDialog = true;
  }

  salvarTipo() {
    if (this.editMode) {
      const index = this.tiposReceita.findIndex(t => t.id === this.selectedTipo.id);
      if (index !== -1) {
        this.tiposReceita[index] = { ...this.selectedTipo };
      }
    } else {
      this.selectedTipo.id = Math.max(...this.tiposReceita.map(t => t.id)) + 1;
      this.tiposReceita.push({ ...this.selectedTipo });
    }
    this.showDialog = false;
  }

  excluirTipo(tipo: TipoReceita) {
    if (confirm(`Deseja realmente excluir o tipo de receita "${tipo.nome}"?`)) {
      this.tiposReceita = this.tiposReceita.filter(t => t.id !== tipo.id);
    }
  }
}