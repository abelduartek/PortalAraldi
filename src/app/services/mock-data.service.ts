import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { 
  User, 
  CNPJ, 
  NotaFiscal, 
  Fornecedor, 
  DashboardData, 
  CentroCusto, 
  TipoDespesa, 
  TipoReceita,
  Receita,
  ItemNota
} from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private cnpjs: CNPJ[] = [
    {
      id: 1,
      cnpj: '12.345.678/0001-90',
      nomeFantasia: 'Araldi Pizzaria Centro',
      razaoSocial: 'Araldi Alimentação Ltda',
      endereco: 'Rua das Flores, 123 - Centro',
      contaBancaria: '033-12345-6',
      ultimaImportacao: new Date('2024-01-15T10:30:00'),
      status: 'ativo'
    },
    {
      id: 2,
      cnpj: '12.345.678/0002-71',
      nomeFantasia: 'Araldi Pizzaria Shopping',
      razaoSocial: 'Araldi Alimentação Shopping Ltda',
      endereco: 'Shopping Center, Loja 45',
      contaBancaria: '033-12345-7',
      ultimaImportacao: new Date('2024-01-15T09:15:00'),
      status: 'ativo'
    },
    {
      id: 3,
      cnpj: '12.345.678/0003-52',
      nomeFantasia: 'Araldi Delivery',
      razaoSocial: 'Araldi Delivery Ltda',
      endereco: 'Av. Principal, 456',
      contaBancaria: '033-12345-8',
      ultimaImportacao: new Date('2024-01-14T16:45:00'),
      status: 'ativo'
    }
  ];

  private notasFiscais: NotaFiscal[] = [
    {
      id: 1,
      numero: '000123456',
      fornecedor: 'Laticínios São Paulo Ltda',
      cnpjFornecedor: '98.765.432/0001-10',
      data: new Date('2024-01-10'),
      valorTotal: 2850.50,
      status: 'importada',
      pagamentoIdentificado: true,
      cnpjDestino: '12.345.678/0001-90',
      itens: [
        {
          id: 1,
          descricao: 'Queijo Mussarela',
          quantidade: 50,
          unidade: 'kg',
          valorUnitario: 32.50,
          valorTotal: 1625.00,
          ncm: '04069000',
          categorizado: true,
          tipoDespesa: 'Matéria-prima'
        },
        {
          id: 2,
          descricao: 'Queijo Parmesão',
          quantidade: 25,
          unidade: 'kg',
          valorUnitario: 49.02,
          valorTotal: 1225.50,
          ncm: '04069000',
          categorizado: true,
          tipoDespesa: 'Matéria-prima'
        }
      ]
    },
    {
      id: 2,
      numero: '000123457',
      fornecedor: 'Distribuidora de Carnes Premium',
      cnpjFornecedor: '87.654.321/0001-23',
      data: new Date('2024-01-12'),
      valorTotal: 1890.75,
      status: 'pendente_categorizacao',
      pagamentoIdentificado: false,
      cnpjDestino: '12.345.678/0001-90',
      itens: [
        {
          id: 3,
          descricao: 'Pepperoni Importado',
          quantidade: 15,
          unidade: 'kg',
          valorUnitario: 85.50,
          valorTotal: 1282.50,
          ncm: '16010000',
          categorizado: false
        },
        {
          id: 4,
          descricao: 'Presunto Parma',
          quantidade: 12,
          unidade: 'kg',
          valorUnitario: 50.69,
          valorTotal: 608.25,
          ncm: '16024100',
          categorizado: false
        }
      ]
    }
  ];

  private fornecedores: Fornecedor[] = [
    {
      id: 1,
      cnpj: '98.765.432/0001-10',
      razaoSocial: 'Laticínios São Paulo Ltda',
      endereco: 'Rua dos Laticínios, 789',
      telefone: '(11) 3456-7890',
      email: 'vendas@laticiniossp.com.br',
      itensRelacionados: ['Queijo Mussarela', 'Queijo Parmesão', 'Ricota']
    },
    {
      id: 2,
      cnpj: '87.654.321/0001-23',
      razaoSocial: 'Distribuidora de Carnes Premium',
      endereco: 'Av. das Carnes, 456',
      telefone: '(11) 2345-6789',
      email: 'pedidos@carnespremium.com.br',
      itensRelacionados: ['Pepperoni', 'Presunto', 'Bacon']
    }
  ];

  private centrosCusto: CentroCusto[] = [
    {
      id: 1,
      nome: 'Produção',
      descricao: 'Custos relacionados à produção de pizzas',
      cnpjsVinculados: ['12.345.678/0001-90', '12.345.678/0002-71']
    },
    {
      id: 2,
      nome: 'Delivery',
      descricao: 'Custos específicos do delivery',
      cnpjsVinculados: ['12.345.678/0003-52']
    }
  ];

  private tiposDespesa: TipoDespesa[] = [
    { id: 1, nome: 'Matéria-prima', descricao: 'Ingredientes para produção' },
    { id: 2, nome: 'Energia', descricao: 'Energia elétrica e gás' },
    { id: 3, nome: 'Logística', descricao: 'Transporte e entrega' },
    { id: 4, nome: 'Pessoal', descricao: 'Salários e encargos' }
  ];

  private tiposReceita: TipoReceita[] = [
    { id: 1, nome: 'Rodízio', descricao: 'Vendas no rodízio' },
    { id: 2, nome: 'Delivery', descricao: 'Vendas por delivery' },
    { id: 3, nome: 'Eventos', descricao: 'Eventos e festas' }
  ];

  private receitas: Receita[] = [
    {
      id: 1,
      data: new Date('2024-01-10'),
      valor: 15420.50,
      tipo: 'Rodízio',
      cnpj: '12.345.678/0001-90',
      centroCusto: 'Produção',
      origem: 'mogo'
    },
    {
      id: 2,
      data: new Date('2024-01-11'),
      valor: 8750.25,
      tipo: 'Delivery',
      cnpj: '12.345.678/0003-52',
      centroCusto: 'Delivery',
      origem: 'multipedidos'
    }
  ];

  getDashboardData(): Observable<DashboardData> {
    const dashboardData: DashboardData = {
      totalReceitas: 245680.75,
      totalDespesas: 156420.30,
      fluxoCaixa: 89260.45,
      itensPendentes: 12,
      evolucaoResultado: [
        { mes: 'Jan', valor: 89260.45 },
        { mes: 'Fev', valor: 95420.30 },
        { mes: 'Mar', valor: 87650.20 },
        { mes: 'Abr', valor: 102340.15 },
        { mes: 'Mai', valor: 98750.60 },
        { mes: 'Jun', valor: 105890.25 }
      ],
      alertas: [
        '12 itens pendentes de categorização',
        '3 pagamentos sem nota fiscal vinculada',
        'Valor do queijo mussarela 15% acima da média'
      ]
    };
    return of(dashboardData);
  }

  getCNPJs(): Observable<CNPJ[]> {
    return of(this.cnpjs);
  }

  getNotasFiscais(): Observable<NotaFiscal[]> {
    return of(this.notasFiscais);
  }

  getFornecedores(): Observable<Fornecedor[]> {
    return of(this.fornecedores);
  }

  getCentrosCusto(): Observable<CentroCusto[]> {
    return of(this.centrosCusto);
  }

  getTiposDespesa(): Observable<TipoDespesa[]> {
    return of(this.tiposDespesa);
  }

  getTiposReceita(): Observable<TipoReceita[]> {
    return of(this.tiposReceita);
  }

  getReceitas(): Observable<Receita[]> {
    return of(this.receitas);
  }

  getItensPendentesCategorizacao(): Observable<ItemNota[]> {
    const itensPendentes = this.notasFiscais
      .flatMap(nota => nota.itens)
      .filter(item => !item.categorizado);
    return of(itensPendentes);
  }
}