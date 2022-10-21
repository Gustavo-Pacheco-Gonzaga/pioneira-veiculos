import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-gerar-evento',
  templateUrl: './gerar-evento.component.html',
  styleUrls: ['./gerar-evento.component.css']
})
export class GerarEventoComponent implements OnInit {

  formEvento: any;
  erro: any = {};
  mensagem: any;

  menu: any = 1;

  constructor(
    public as: AppService,
    public fb: FormBuilder,
    public r: Router,
  ) { }

  ngOnInit() {
    localStorage.setItem('pagAtual', 'gerar-evento');
    this.clearMensagem();
    this.formEvento = this.fb.group({
      numero_evento: ['', Validators.required],
      placa_veiculo: ['', Validators.required],
      modelo_veiculo: ['', Validators.required],
      data_abertura: ['', Validators.required],
      descricao: '',
      veiculo_assistencial: '',
    });
  }

  toggleMenu(){
    if(this.menu == 1){
      this.menu = 0;
    } else {
      this.menu = 1;
    }
  }

  gerarEvento() {
    return this.as.createEvento(this.formEvento.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
    }, errors => {
      this.erro = errors.error.mensagem;
    });
  }

  clearMensagem() {
    this.mensagem = "";
  }

}
