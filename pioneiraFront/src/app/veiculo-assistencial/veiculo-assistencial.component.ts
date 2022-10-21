import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-veiculo-assistencial',
  templateUrl: './veiculo-assistencial.component.html',
  styleUrls: ['./veiculo-assistencial.component.css']
})
export class VeiculoAssistencialComponent implements OnInit {

  assistencial: any;
  empresa: any;
  evento: any;
  formAlugar: any;

  erro: any
  mensagem: any;

  veiculoAtual: any;
  assistencialId: any;
  eventoId: any;

  popupAlugar: any = 0;
  popupRemover: any = 0;
  popupHideVeiculo: any = 0;

  menu: any = 1;

  subscription !: Subscription;


  constructor(
    public as: AppService,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getAll();

    this.subscription = timer(0, 20000).subscribe(result => 
      this.getAll()
    );
  }

  getAll() {
    this.as.showVeiculoAssistencial().subscribe((val: any) => {
      this.assistencial = val;
    });

    this.as.showVeiculoEmpresa().subscribe((val: any) => {
      this.empresa = val;
    });

    this.as.showEvento().subscribe((val: any) => {
      this.evento = val;
    })
  }

  toggleMenu() {
    if (this.menu == 1) {
      this.menu = 0;
    } else {
      this.menu = 1;
    }
  }

  openPopup(id: any, tipo: any, tipoId: any) {
    this.clearMensagem();
    this.as.showVeiculoEmpresaById(id).subscribe((val: any) => {
      this.veiculoAtual = val;
    });
    if (tipo == 'empresa') {
      this.popupAlugar = 1;
      this.formAlugar = this.fb.group({
        nome_condutor: ['', Validators.required],
        dias_emprestimo: ['', Validators.required],
        data_saida: ['', Validators.required],
        cidade: ['', Validators.required],
        veiculo_empresa_id: id,
      });
    }
    if (tipo == 'assistencial') {
      this.popupRemover = 1;
      this.assistencialId = tipoId;
    }
  }

  openHideVeiculo(id: any) {
    this.clearMensagem();
    this.popupHideVeiculo = 1;
    this.eventoId = id;
    this.as.showEventoById(id).subscribe((val: any) => {
      this.veiculoAtual = val;
    });
  }

  closePopup() {
    this.popupAlugar = 0;
    this.popupRemover = 0;
    this.popupHideVeiculo = 0;
    this.assistencialId = '';
    this.eventoId = '';
    this.veiculoAtual = '';
  }

  alugar() {
    return this.as.alugarVeiculo(this.formAlugar.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }

  removeAlugar() {
    return this.as.removeAlugar(this.assistencialId).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }

  hideVeiculo() {
    return this.as.removeEventoVeiculo(this.eventoId).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }

  clearMensagem() {
    this.mensagem = "";
    this.erro = "";
  }

  validarDataCor(data: any, cor: any, dias: any) {
    let diaAtual = new Date();
    let penultimoDia = new Date(data);
    let ultimoDia = new Date(data);

    let dia = new Date(data);
    let arrayDias = [];

    for(let i = 1; i < dias + 1; i++ ){
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

    for(let i = 1; i < dias + 1; i++ ){
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

  validarDataBottom(data: any, cor: any, dias: number) {
    let diaAtual = new Date();
    let penultimoDia = new Date(data);
    let ultimoDia = new Date(data);

    let dia = new Date(data);
    let arrayDias = [];

    for(let i = 1; i < dias + 1; i++ ){
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
      return { 'background-color': 'white', 'border-color': '#F2C943' }
    } else if (diaAtual >= ultimoDia) {
      return { 'background-color': 'white', 'border-color': 'red' }
    } else {
      return { 'background-color': cor, 'border-color': cor }
    }
  }

  validarDataBottomText(data: any, cor: any, dias: number) {
    let diaAtual = new Date();
    let penultimoDia = new Date(data);
    let ultimoDia = new Date(data);
    
    let dia = new Date(data);
    let arrayDias = [];

    for(let i = 1; i < dias + 1; i++ ){
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
      return { 'color': '#F2C943' } // amarelo
    } else if (diaAtual >= ultimoDia) {
      return { 'color': 'red' } // vermelho
    } else {
      return { 'color': cor, } // cor padrão
    }
  }

  setDataLimite(data: any, dias: number) {
    let dia = new Date(data);
    let arrayDias = [];

    for(let i = 1; i < dias + 1; i++ ){
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

}
