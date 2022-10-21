import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  direcionamento: any;
  orcamento: any;
  cotacao: any;
  recebimento: any;
  reparo: any;
  mecanica: any;

  eventoId: any;
  mecanicaId: any;
  retornoId: any;

  popupDirecionamento: any = 0;
  popupNovoOrcamento: any = 0;
  popupOrcamento: any = 0;
  popupCotacao: any = 0;
  popupNovoRecebimento: any = 0
  popupRecebimento: any = 0;
  popupNovoReparo: any = 0;
  popupReparo: any = 0;

  observacao: any;
  complemento: any;
  evento: any;

  listaMecanica: any = 0;

  mecanicaEscolhida: any = "";
  mecanicaEscolhidaNome: any = "";

  formEventoFinalizar: any;

  formOrcamento: any;
  formOrcamentoObservacao: any;

  formCotacao: any;
  formCotacaoObservacao: any;

  formRecebimento: any;
  formRecebimentoObservacao: any

  formReparo: any;
  formReparoComplemento: any;
  formReparoObservacao: any;
  formReparoFinalizar: any;

  mensagem: any;
  erro: any;

  menu: any = 1;

  subscription !: Subscription;

  constructor(
    public as: AppService,
    public r: Router,
    public fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.getAll();
    
    this.subscription = timer(0, 20000).subscribe(result => 
      this.getAll()
    );
  }
  
  getAll() {
    this.as.showDirecionamento().subscribe((val: any) => {
      this.direcionamento = val;
      this.direcionamento.size = 0;
      val.forEach((el: any) => {
        if (el.finalizado == 0 && el.direcionamento_evento.finalizado == 0) {
          this.direcionamento.size += 1;
        }
      });
    });
    this.as.showOrcamento().subscribe((val: any) => {
      this.orcamento = val;
      this.orcamento.size = 0;
      val.forEach((el: any) => {
        if (el.aprovado == 0 && el.orcamento_evento.finalizado == 0) {
          this.orcamento.size += 1;
        }
      });
    });
    this.as.showCotacao().subscribe((val: any) => {
      this.cotacao = val;
      this.cotacao.size = 0;
      val.forEach((el: any) => {
        if (el.finalizado == 0 && el.cotacao_evento.finalizado == 0) {
          this.cotacao.size += 1;
        }
      });
    });
    this.as.showRecebimento().subscribe((val: any) => {
      this.recebimento = val;
      this.recebimento.size = 0;
      val.forEach((el: any) => {
        if (el.finalizado == 0 && el.recebimento_evento.finalizado == 0) {
          this.recebimento.size += 1;
        }
      });
    });
    this.as.showReparo().subscribe((val: any) => {
      this.reparo = val;
      this.reparo.size = 0;
      val.forEach((el: any) => {
        if (el.finalizado == 0 && el.reparo_evento.finalizado == 0) {
          this.reparo.size += 1;
        }
      });
    });
    this.as.showListaMecanica().subscribe((val: any) => {
      this.mecanica = val;
    });
  }

  toggleMenu() {
    if (this.menu == 1) {
      this.menu = 0;
    } else {
      this.menu = 1;
    }
  }

  // Controla a lista de mecanicas da área de direcionamento
  showListaMecanica() {
    this.listaMecanica = 1;
  }

  closeListaMecanica() {
    this.listaMecanica = 0;
  }

  changeMecanicaValue(id: any, nome: any, cidade: any) {
    this.mecanicaEscolhida = id;
    this.formOrcamento.value.mecanica_id = this.mecanicaEscolhida
    this.mecanicaEscolhidaNome = nome + " - " + cidade;
  }

  clearMecanicaValue() {
    this.mecanicaEscolhidaNome = "";
  }
  // Fim controla a lista de mecanicas da área de direcionamento

  // Formatadores de data
  validarDataCor(data: any, cor: any, dias: any) {
    let diaAtual = new Date();
    let penultimoDia = new Date(data);
    let ultimoDia = new Date(data);

    let dia = new Date(data);
    let arrayDias = [];

    for(let i = 0; i < dias + 1; i++ ){
      let dias = new Date(dia.setDate(dia.getDate() + i));
      arrayDias.push(dias);
      dia = new Date(data);
    }
    
    arrayDias.forEach(d => {
      if (this.getWeekend(d) == 6 || this.getWeekend(d) == 0) {
        d.setDate(d.getDate() + 2);
      }
    });

    penultimoDia = arrayDias[arrayDias.length - 2];
    ultimoDia = arrayDias[arrayDias.length - 1];

    if (diaAtual >= ultimoDia || diaAtual.getDate() == penultimoDia.getDate() && diaAtual.getMonth() == penultimoDia.getMonth() && diaAtual.getFullYear() == penultimoDia.getFullYear()) {
      return { 'color': 'white' }
    } else {
      return { 'color': cor }
    }
  }

  validarDataFundo(data: any, cor: any, dias: number) {
    let diaAtual = new Date();
    let penultimoDia = new Date(data);
    let ultimoDia = new Date(data);

    let dia = new Date(data);
    let arrayDias = [];

    for(let i = 0; i < dias + 1; i++ ){
      let dias = new Date(dia.setDate(dia.getDate() + i));
      arrayDias.push(dias);
      dia = new Date(data);
    }
    
    arrayDias.forEach(d => {
      if (this.getWeekend(d) == 6 || this.getWeekend(d) == 0) {
        d.setDate(d.getDate() + 2);
      }
    });

    penultimoDia = arrayDias[arrayDias.length - 2];
    ultimoDia = arrayDias[arrayDias.length - 1];

    if (diaAtual.getDate() == penultimoDia.getDate() && diaAtual.getMonth() == penultimoDia.getMonth() && diaAtual.getFullYear() == penultimoDia.getFullYear()) {
      return { 'background-color': '#F2C943', 'border-color': 'transparent' }
    } else if (diaAtual >= ultimoDia) {
      return { 'background-color': 'red', 'border-color': 'red' }
    } else {
      return { 'background-color': 'white', 'border-color': cor }
    }
  }

  setDataLimite(data: any, dias: number) {
    let dia = new Date(data);
    let arrayDias = [];

    for(let i = 0; i < dias + 1; i++ ){
      let dias = new Date(dia.setDate(dia.getDate() + i));
      arrayDias.push(dias);
      dia = new Date(data);
    }
    
    arrayDias.forEach(d => {
      if (this.getWeekend(d) == 6 || this.getWeekend(d) == 0) {
        d.setDate(d.getDate() + 2);
      }
    });
    return arrayDias[arrayDias.length - 1];
  }

  getWeekend(day: any) {
    let dayOfWeek = day.getDay();
    return dayOfWeek;
  }
  // Fim formatadores de data

  // Fecha todos os popups
  closePopup() {
    this.popupDirecionamento = 0;
    this.popupNovoOrcamento = 0;
    this.popupOrcamento = 0;
    this.popupCotacao = 0;
    this.popupNovoRecebimento = 0;
    this.popupRecebimento = 0;
    this.popupNovoReparo = 0;
    this.popupReparo = 0;
    this.popupDirecionamento = 0;
    this.observacao = '';
    this.complemento = '';
    this.evento = '';
    this.clearMecanicaValue();
    this.closeListaMecanica();
  }

  // Limpa a mensagem de criação
  clearMensagem() {
    this.mensagem = "";
    this.erro = "";
  }

  // Abre os popups de criação das devidas áreas
  openPopup(id: any, tipo: any, tipoId: any, mecanicaId: any, retornoId: any) {
    this.clearMensagem();
    this.closePopup();
    this.eventoId = id;
    this.mecanicaId = mecanicaId;
    this.retornoId = retornoId;
    this.as.showEventoById(id).subscribe((val: any) => {
      this.evento = val;
    });
    // Direcionamento
    if (tipo == 'direcionamento') {
      this.popupDirecionamento = 1;
      this.formEventoFinalizar = this.fb.group({
        'observacao_finalizado': ['', Validators.required]
      })
    }
    // Orçamento
    if (tipo == 'novo-orcamento') {
      this.popupNovoOrcamento = 1;
      this.formOrcamento = this.fb.group({
        'evento_id': this.eventoId,
        'observacao': '',
        'retorno_id': retornoId,
        'mecanica_id': ["", Validators.required]
      });
    }
    if (tipo == 'orcamento') {
      this.popupOrcamento = 1;
      this.getObservacaoOrcamento(tipoId);
      this.formOrcamentoObservacao = this.fb.group({
        'orcamento_id': tipoId,
        'observacao': ['', Validators.required],
      });
    }
    // Cotacao
    if (tipo == 'cotacao') {
      this.getObservacaoCotacao(tipoId);
      this.popupCotacao = 1;
      this.formCotacaoObservacao = this.fb.group({
        'cotacao_id': tipoId,
        'observacao': ['', Validators.required]
      });
    }
    // Recebimento
    if (tipo == 'novo-recebimento') {
      this.popupNovoRecebimento = 1;
      this.formRecebimento = this.fb.group({
        'evento_id': this.eventoId,
        'observacao': '',
        'mecanica_id': this.mecanicaId,
        'retorno_id': retornoId,
        'data_limite': ["", Validators.required]
      });
    }
    if (tipo == 'recebimento') {
      this.getObservacaoRecebimento(tipoId);
      this.popupRecebimento = 1;
      this.formRecebimentoObservacao = this.fb.group({
        'recebimento_id': tipoId,
        'observacao': ['', Validators.required]
      });
    }
    // Reparo
    if (tipo == 'novo-reparo') {
      this.popupNovoReparo = 1;
      this.formReparo = this.fb.group({
        'evento_id': this.eventoId,
        'observacao': '',
        'mecanica_id': this.mecanicaId,
        'retorno_id': retornoId,
        'data_limite': ["", Validators.required]
      });
    }
    if (tipo == 'reparo') {
      this.popupReparo = 1;
      this.getComplementoReparo(tipoId);
      this.getObservacaoReparo(tipoId);
      this.formReparoObservacao = this.fb.group({
        'reparo_id': tipoId,
        'observacao': ['', Validators.required]
      });
      this.formReparoComplemento = this.fb.group({
        'reparo_id': tipoId,
        'observacao': ['', Validators.required]
      });
    }
  }
  // Fim abre os popups de criação das devidas áreas

  // Mostra as observações nos Popups
  getObservacaoOrcamento(id: any) {
    return this.as.showOrcamentoObservacao(id).subscribe((val: any) => {
      this.observacao = val;
    });
  }
  getObservacaoCotacao(id: any) {
    return this.as.showCotacaoObservacao(id).subscribe((val: any) => {
      this.observacao = val;
    });
  }
  getObservacaoRecebimento(id: any) {
    return this.as.showRecebimentoObservacao(id).subscribe((val: any) => {
      this.observacao = val;
    });
  }
  getComplementoReparo(id: any) {
    return this.as.showReparoComplemento(id).subscribe((val: any) => {
      this.complemento = val;
    });
  }
  getObservacaoReparo(id: any) {
    return this.as.showReparoObservacao(id).subscribe((val: any) => {
      this.observacao = val;
    });
  }
  // Fim mostra as observações nos Popups

  // Funções chamadas pelos botões dos popups
  // Direcionamento
  finalizarEvento() {
    this.clearMensagem();
    this.as.finalizarEvento(this.eventoId, this.formEventoFinalizar.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }

  // Orcamento
  createOrcamento() {
    this.clearMensagem();
    this.as.createOrcamento(this.formOrcamento.value).subscribe((val: any) => {
      this.as.changeEventoData(this.eventoId).subscribe((val: any) => { });
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }
  createOrcamentoObservacao() {
    this.clearMensagem();
    this.as.createOrcamentoObservacao(this.formOrcamentoObservacao.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }

  // Cotacao
  createCotacao() {
    this.clearMensagem();
    this.formCotacao = this.fb.group({
      'evento_id': this.eventoId,
      'mecanica_id': this.mecanicaId,
      'retorno_id': this.retornoId,
    });
    this.as.createCotacao(this.formCotacao.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }
  createCotacaoObservacao() {
    this.clearMensagem();
    this.as.createCotacaoObservacao(this.formCotacaoObservacao.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }

  // Recebimento
  createRecebimento() {
    this.clearMensagem();
    this.as.createRecebimento(this.formRecebimento.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }
  createRecebimentoObservacao() {
    this.clearMensagem();
    this.as.createRecebimentoObservacao(this.formRecebimentoObservacao.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }

  // Reparo
  createReparo() {
    this.clearMensagem();
    this.as.createReparo(this.formReparo.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }
  createReparoComplemento() {
    this.clearMensagem();
    this.as.createReparoComplemento(this.formReparoComplemento.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }
  createReparoObservacao() {
    this.clearMensagem();
    this.as.createReparoObservacao(this.formReparoObservacao.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }
  finalizarReparo() {
    this.clearMensagem();
    this.formReparoFinalizar = this.fb.group({
      'evento_id': this.eventoId
    });
    this.as.finalizarReparo(this.formReparoFinalizar.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }

  // Fim funções chamadas pelos botões dos popups
}

