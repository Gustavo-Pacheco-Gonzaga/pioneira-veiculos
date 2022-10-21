import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-relatorio-evento',
  templateUrl: './relatorio-evento.component.html',
  styleUrls: ['./relatorio-evento.component.css']
})
export class RelatorioEventoComponent implements OnInit {

  id = this.ar.snapshot.paramMap.get('id');

  evento: any;
  orcamento: any;
  cotacao: any;
  recebimento: any;
  reparo: any;
  retorno: any;

  popupRetorno: any = 0;
  formRetorno: any;

  mensagem: any;

  menu: any = 1;

  subscription !: Subscription;

  constructor(
    public as: AppService,
    public r: Router,
    public fb: FormBuilder,
    public ar: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAll();

    this.subscription = timer(0, 20000).subscribe(result => 
      this.getAll()
    );
  }

  getAll() {
    this.as.showEventoById(this.id).subscribe((val: any) => {
      this.evento = val;
    });
    this.as.showRetornoById(this.id).subscribe((val: any) => {
      this.retorno = val;
    });
    this.as.showReparoById(this.id).subscribe((val: any) => {
      this.reparo = val;
    });
    this.as.showRecebimentoById(this.id).subscribe((val: any) => {
      this.recebimento = val;
    });
    this.as.showCotacaoById(this.id).subscribe((val: any) => {
      this.cotacao = val;
    });
    this.as.showOrcamentoById(this.id).subscribe((val: any) => {
      this.orcamento = val;
    });
  }

  toggleMenu(){
    if(this.menu == 1){
      this.menu = 0;
    } else {
      this.menu = 1;
    }
  }

  closePopup() {
    this.popupRetorno = 0
  }

  clearMensagem() {
    this.mensagem = '';
  }

  openPopup() {
    this.clearMensagem();
    this.popupRetorno = 1
    this.formRetorno = this.fb.group({
      evento_id: this.id,
      'observacao': '',
    });
  }

  criarRetorno() {
    this.as.createRetorno(this.formRetorno.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    })
  }

}
