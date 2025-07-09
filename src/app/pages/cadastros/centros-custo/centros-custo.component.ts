import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../../services/mock-data.service';
import { CentroCusto, CNPJ } from '../../../models/interfaces';

@Component({
  selector: 'app-centros-custo',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    TableModule, 
    ButtonModule, 
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    FormsModule
  ],
  templateUrl: './centros-custo.component.html',
  styleUrls: ['./centros-custo.component.css']
})
export class CentrosCustoComponent implements OnInit {
  centrosCusto: CentroCusto[] = [];
  cnpjs: CNPJ[] = [];
  showDialog = false;
  editMode = false;
  selectedCentro: CentroCusto = this.getEmptyCentro();

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.mockDataService.getCentrosCusto().subscribe(data => {
      this.centrosCusto = data;
    });

    this.mockDataService.getCNPJs().subscribe(data => {
      this.cnpjs = data;
    });
  }

  getEmptyCentro(): CentroCusto {
    return {
      id: 0,
      nome: '',
      descricao: '',
      cnpjsVinculados: []
    };
  }

  novoCentro() {
    this.selectedCentro = this.getEmptyCentro();
    this.editMode = false;
    this.showDialog = true;
  }

  editarCentro(centro: CentroCusto) {
    this.selectedCentro = { ...centro };
    this.editMode = true;
    this.showDialog = true;
  }

  salvarCentro() {
    if (this.editMode) {
      const index = this.centrosCusto.findIndex(c => c.id === this.selectedCentro.id);
      if (index !== -1) {
        this.centrosCusto[index] = { ...this.selectedCentro };
      }
    } else {
      this.selectedCentro.id = Math.max(...this.centrosCusto.map(c => c.id)) + 1;
      this.centrosCusto.push({ ...this.selectedCentro });
    }
    this.showDialog = false;
  }

  excluirCentro(centro: CentroCusto) {
    if (confirm(`Deseja realmente excluir o centro de custo "${centro.nome}"?`)) {
      this.centrosCusto = this.centrosCusto.filter(c => c.id !== centro.id);
    }
  }

  getCnpjOptions() {
    return this.cnpjs.map(cnpj => ({
      label: `${cnpj.nomeFantasia} (${cnpj.cnpj})`,
      value: cnpj.cnpj
    }));
  }

  getCnpjsVinculadosText(cnpjsVinculados: string[]): string {
    return cnpjsVinculados.map(cnpj => {
      const cnpjObj = this.cnpjs.find(c => c.cnpj === cnpj);
      return cnpjObj ? cnpjObj.nomeFantasia : cnpj;
    }).join(', ');
  }
}