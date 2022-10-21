import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-mecanica',
  templateUrl: './mecanica.component.html',
  styleUrls: ['./mecanica.component.css']
})
export class MecanicaComponent implements OnInit {

  mecanica: any;
  menu: any = 1;

  formAdicionar: any;
  mecanicaId: any;

  mensagem: any = '';
  erro: any;

  popupAdicionar: any = 0;
  popupRemover: any = 0;

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
    this.as.showMecanica().subscribe((val: any) => {
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

  openPopupAdicionar() {
    this.closePopup();
    this.clearMensagem();
    this.popupAdicionar = 1;
    this.formAdicionar = this.fb.group({
      nome: ['', Validators.required],
      cidade: ['', Validators.required],
    });
  }

  openPopupRemover(id: any) {
    this.closePopup();
    this.clearMensagem();
    this.popupRemover = 1;
    this.mecanicaId = id;
  }

  closePopup() {
    this.popupAdicionar = 0;
    this.popupRemover = 0;
  }

  adicionar() {
    return this.as.adicionarMecanica(this.formAdicionar.value).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, (errors: any) => {
      this.erro = errors.error.mensagem;
    });
  }

  remover() {
    return this.as.removeMecanica(this.mecanicaId).subscribe((val: any) => {
      this.mensagem = val.mensagem;
      this.closePopup();
      this.getAll();
    }, (errors: any) => {
      this.erro = errors.error.mensagem;
    });
  }

  clearMensagem() {
    this.mensagem = "";
    this.erro = "";
  }
}
