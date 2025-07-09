export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'financeiro' | 'consultivo';
}

export interface CNPJ {
  id: number;
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;
  endereco: string;
  contaBancaria: string;
  ultimaImportacao: Date;
  status: 'ativo' | 'inativo';
}

export interface NotaFiscal {
  id: number;
  numero: string;
  fornecedor: string;
  cnpjFornecedor: string;
  data: Date;
  valorTotal: number;
  status: 'importada' | 'erro' | 'pendente_categorizacao';
  pagamentoIdentificado: boolean;
  cnpjDestino: string;
  itens: ItemNota[];
}

export interface ItemNota {
  id: number;
  descricao: string;
  quantidade: number;
  unidade: string;
  valorUnitario: number;
  valorTotal: number;
  ncm: string;
  categorizado: boolean;
  tipoDespesa?: string;
}

export interface Fornecedor {
  id: number;
  cnpj: string;
  razaoSocial: string;
  endereco: string;
  telefone: string;
  email: string;
  itensRelacionados: string[];
  categoria?: string;
}

export interface CentroCusto {
  id: number;
  nome: string;
  descricao: string;
  cnpjsVinculados: string[];
}

export interface TipoDespesa {
  id: number;
  nome: string;
  descricao: string;
}

export interface TipoReceita {
  id: number;
  nome: string;
  descricao: string;
}

export interface DashboardData {
  totalReceitas: number;
  totalDespesas: number;
  fluxoCaixa: number;
  itensPendentes: number;
  evolucaoResultado: { mes: string; valor: number }[];
  alertas: string[];
}

export interface Receita {
  id: number;
  data: Date;
  valor: number;
  tipo: string;
  cnpj: string;
  centroCusto: string;
  origem: 'mogo' | 'multipedidos' | 'manual';
}