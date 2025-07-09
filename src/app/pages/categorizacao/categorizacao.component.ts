import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../services/mock-data.service';
import { ItemNota, TipoDespesa, Fornecedor } from '../../models/interfaces';

interface CategoriaFornecedor {
  id: number;
  nome: string;
  descricao: string;
}

@Component({
  selector: 'app-categorizacao',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    TableModule, 
    ButtonModule, 
    DropdownModule, 
    InputTextModule, 
    TagModule,
    TabViewModule,
    TooltipModule,
    FormsModule
  ],
  templateUrl: './categorizacao.component.html',
  styleUrls: ['./categorizacao.component.css']
})
export class CategorizacaoComponent implements OnInit {
  itensPendentes: ItemNota[] = [];
  fornecedoresPendentes: Fornecedor[] = [];
  tiposDespesa: TipoDespesa[] = [];
  selectedTiposDespesa: { [key: number]: TipoDespesa } = {};
  selectedCategoriasFornecedor: { [key: number]: CategoriaFornecedor } = {};
  
  unidadeOptions = [
    { label: 'Quilograma (kg)', value: 'kg' },
    { label: 'Grama (g)', value: 'g' },
    { label: 'Litro (l)', value: 'l' },
    { label: 'Mililitro (ml)', value: 'ml' },
    { label: 'Unidade (un)', value: 'un' },
    { label: 'Pacote (pct)', value: 'pct' },
    { label: 'Caixa (cx)', value: 'cx' },
    { label: 'Metro (m)', value: 'm' }
  ];

  categoriasFornecedor: CategoriaFornecedor[] = [
    { id: 1, nome: 'Laticínios', descricao: 'Fornecedores de produtos lácteos' },
    { id: 2, nome: 'Carnes e Frios', descricao: 'Fornecedores de carnes e embutidos' },
    { id: 3, nome: 'Vegetais e Temperos', descricao: 'Fornecedores de vegetais e condimentos' },
    { id: 4, nome: 'Bebidas', descricao: 'Fornecedores de bebidas' },
    { id: 5, nome: 'Embalagens', descricao: 'Fornecedores de embalagens e descartáveis' },
    { id: 6, nome: 'Limpeza', descricao: 'Fornecedores de produtos de limpeza' },
    { id: 7, nome: 'Equipamentos', descricao: 'Fornecedores de equipamentos e utensílios' },
    { id: 8, nome: 'Serviços', descricao: 'Prestadores de serviços' }
  ];
  
  sugestoesIA = [
    { item: 'Queijo Mussarela', sugestao: 'Matéria-prima', confianca: 95 },
    { item: 'Pepperoni Importado', sugestao: 'Matéria-prima', confianca: 90 },
    { item: 'Presunto Parma', sugestao: 'Matéria-prima', confianca: 88 }
  ];

  sugestoesFornecedorIA = [
    { fornecedor: 'Laticínios São Paulo Ltda', categoria: 'Laticínios', confianca: 98 },
    { fornecedor: 'Distribuidora de Carnes Premium', categoria: 'Carnes e Frios', confianca: 95 }
  ];

  // Para controle de edição de linhas
  clonedItems: { [s: string]: ItemNota } = {};

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.mockDataService.getItensPendentesCategorizacao().subscribe(data => {
      this.itensPendentes = data;
    });

    this.mockDataService.getTiposDespesa().subscribe(data => {
      this.tiposDespesa = data;
    });

    // Carregar fornecedores pendentes (simulado)
    this.mockDataService.getFornecedores().subscribe(data => {
      // Simular que alguns fornecedores estão pendentes de categorização
      this.fornecedoresPendentes = data.filter(f => !f.categoria);
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  getSugestaoIA(descricao: string): any {
    return this.sugestoesIA.find(s => s.item === descricao);
  }

  getSugestaoFornecedorIA(razaoSocial: string): any {
    return this.sugestoesFornecedorIA.find(s => s.fornecedor === razaoSocial);
  }

  aceitarSugestao(item: ItemNota) {
    const sugestao = this.getSugestaoIA(item.descricao);
    if (sugestao) {
      const tipoDespesa = this.tiposDespesa.find(t => t.nome === sugestao.sugestao);
      if (tipoDespesa) {
        this.selectedTiposDespesa[item.id] = tipoDespesa;
      }
    }
  }

  aceitarSugestaoFornecedor(fornecedor: Fornecedor) {
    const sugestao = this.getSugestaoFornecedorIA(fornecedor.razaoSocial);
    if (sugestao) {
      const categoria = this.categoriasFornecedor.find(c => c.nome === sugestao.categoria);
      if (categoria) {
        this.selectedCategoriasFornecedor[fornecedor.id] = categoria;
      }
    }
  }

  salvarCategorizacao(item: ItemNota) {
    const tipoSelecionado = this.selectedTiposDespesa[item.id];
    if (tipoSelecionado) {
      item.tipoDespesa = tipoSelecionado.nome;
      item.categorizado = true;
      console.log('Item categorizado:', item);
      // Remover da lista de pendentes
      this.itensPendentes = this.itensPendentes.filter(i => i.id !== item.id);
    }
  }

  salvarCategorizacaoFornecedor(fornecedor: Fornecedor) {
    const categoriaSelecionada = this.selectedCategoriasFornecedor[fornecedor.id];
    if (categoriaSelecionada) {
      fornecedor.categoria = categoriaSelecionada.nome;
      console.log('Fornecedor categorizado:', fornecedor);
      // Remover da lista de pendentes
      this.fornecedoresPendentes = this.fornecedoresPendentes.filter(f => f.id !== fornecedor.id);
    }
  }

  categorizarTodosItens() {
    this.itensPendentes.forEach(item => {
      if (this.selectedTiposDespesa[item.id]) {
        this.salvarCategorizacao(item);
      }
    });
  }

  categorizarTodosFornecedores() {
    this.fornecedoresPendentes.forEach(fornecedor => {
      if (this.selectedCategoriasFornecedor[fornecedor.id]) {
        this.salvarCategorizacaoFornecedor(fornecedor);
      }
    });
  }

  hasValidItemSelections(): boolean {
    return this.itensPendentes.some(item => this.selectedTiposDespesa[item.id]);
  }

  hasValidFornecedorSelections(): boolean {
    return this.fornecedoresPendentes.some(fornecedor => this.selectedCategoriasFornecedor[fornecedor.id]);
  }

  getConfiancaColor(confianca: number): string {
    if (confianca >= 90) return '#4CAF50';
    if (confianca >= 80) return '#FF9800';
    return '#f44336';
  }

  // Métodos para edição de linhas
  onRowEditInit(item: ItemNota) {
    this.clonedItems[item.id] = { ...item };
  }

  onRowEditSave(item: ItemNota) {
    // Recalcular valor total se quantidade ou valor unitário mudaram
    item.valorTotal = item.quantidade * item.valorUnitario;
    delete this.clonedItems[item.id];
    console.log('Item editado:', item);
  }

  onRowEditCancel(item: ItemNota, index: number) {
    this.itensPendentes[index] = this.clonedItems[item.id];
    delete this.clonedItems[item.id];
  }
}