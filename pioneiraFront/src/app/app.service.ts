import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // rota = `http://localhost/Projetos-Antigos/Pioneira/pioneira/public/api/`;
  rota = `http://evento.pioneiraprotecaoveicular.com.br/sistema/api/`;

  constructor(
    public hc: HttpClient
  ) { }

  // Evento
  createEvento(form: any) {
    return this.hc.post(this.rota + `create-evento`, form);
  }

  showEvento() {
    return this.hc.get(this.rota + `show-evento`);
  }

  removeEventoVeiculo(id: any){
    return this.hc.delete(this.rota + `remove-veiculo-evento/${id}`);
  }

  finalizarEvento(id: any, form: any) {
    return this.hc.put(this.rota + `finalizar-evento/${id}`, form);
  }

  // Mecanica
  showMecanica() {
    return this.hc.get(this.rota + `show-mecanica`);
  }
  showListaMecanica() {
    return this.hc.get(this.rota + `show-lista-mecanica`);
  }
  adicionarMecanica(form: any){
    return this.hc.post(this.rota + `create-mecanica`, form);
  }
  removeMecanica(id: any){
    return this.hc.delete(this.rota + `remove-mecanica/${id}`);
  }

  // Área de Direcionamento
  createOrcamento(form: any) {
    return this.hc.post(this.rota + `create-orcamento`, form);
  }
  showDirecionamento() {
    return this.hc.get(this.rota + `show-direcionamento`);
  }
  showDirecionamentoById(id: any) {
    return this.hc.get(this.rota + `show-direcionamento/${id}`);
  }
  changeEventoData(id: any) {
    return this.hc.get(this.rota + `change-evento-date/${id}`)
  }

  // Área de Orçamento
  createOrcamentoObservacao(form: any) {
    return this.hc.post(this.rota + `create-orcamento-observacao`, form);
  }
  createCotacao(form: any) {
    return this.hc.post(this.rota + `create-cotacao`, form);
  }
  showOrcamento() {
    return this.hc.get(this.rota + `show-orcamento`);
  }
  showOrcamentoById(id: any) {
    return this.hc.get(this.rota + `show-orcamento/${id}`);
  }

  // Área de Cotação
  createCotacaoObservacao(form: any) {
    return this.hc.post(this.rota + `create-cotacao-observacao`, form);
  }
  createRecebimento(form: any) {
    return this.hc.post(this.rota + `create-recebimento`, form);
  }
  showCotacao() {
    return this.hc.get(this.rota + `show-cotacao`);
  }
  showCotacaoById(id: any) {
    return this.hc.get(this.rota + `show-cotacao/${id}`);
  }

  // Área de Recebimento
  createRecebimentoObservacao(form: any) {
    return this.hc.post(this.rota + `create-recebimento-observacao`, form);
  }
  createReparo(form: any) {
    return this.hc.post(this.rota + `create-reparo`, form);
  }
  showRecebimento() {
    return this.hc.get(this.rota + `show-recebimento`);
  }
  showRecebimentoById(id: any) {
    return this.hc.get(this.rota + `show-recebimento/${id}`);
  }

  // Área de Reparo
  createReparoObservacao(form: any) {
    return this.hc.post(this.rota + `create-reparo-observacao`, form);
  }
  createReparoComplemento(form: any) {
    return this.hc.post(this.rota + `create-reparo-complemento`, form);
  }
  finalizarReparo(form: any) {
    return this.hc.post(this.rota + `finalizar-reparo`, form);
  }
  showReparo() {
    return this.hc.get(this.rota + `show-reparo`);
  }
  showReparoById(id: any) {
    return this.hc.get(this.rota + `show-reparo/${id}`);
  }

  // Área de relatório
  showEventoForm(form: any) {
    return this.hc.post(this.rota + `show-evento-form`, form);
  }
  showEventoById(id: any) {
    return this.hc.get(this.rota + `show-evento/${id}`);
  }
  createRetorno(form: any) {
    return this.hc.post(this.rota + `create-retorno`, form);
  }
  showRetornoById(id: any) {
    return this.hc.get(this.rota + `show-retorno/${id}`);
  }

  // Área de Veículo assistencial
  alugarVeiculo(form: any) {
    return this.hc.post(this.rota + `alugar-veiculo`, form);
  }
  showVeiculoAssistencial() {
    return this.hc.get(this.rota + `show-veiculo-assistencial`);
  }
  showVeiculoEmpresa() {
    return this.hc.get(this.rota + `show-veiculo-empresa`);
  }
  showVeiculoEmpresaById(id: any) {
    return this.hc.get(this.rota + `show-veiculo-empresa/${id}`);
  }
  removeAlugar(id: any) {
    return this.hc.delete(this.rota + `remove-alugar/${id}`)
  }

  // Área de Observações 
  showOrcamentoObservacao(id: any) {
    return this.hc.get(this.rota + `show-orcamento-observacao/${id}`)
  }
  showCotacaoObservacao(id: any) {
    return this.hc.get(this.rota + `show-cotacao-observacao/${id}`)
  }
  showRecebimentoObservacao(id: any) {
    return this.hc.get(this.rota + `show-recebimento-observacao/${id}`)
  }
  showReparoObservacao(id: any) {
    return this.hc.get(this.rota + `show-reparo-observacao/${id}`)
  }
  showReparoComplemento(id: any) {
    return this.hc.get(this.rota + `show-reparo-complemento/${id}`)
  }

}
