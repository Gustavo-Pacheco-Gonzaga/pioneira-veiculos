import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-relatorio-veiculo',
  templateUrl: './relatorio-veiculo.component.html',
  styleUrls: ['./relatorio-veiculo.component.css']
})
export class RelatorioVeiculoComponent implements OnInit {

  formSearch: any;
  evento: any;

  menu: any = 1;

  constructor(
    public as: AppService,
    public r: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    localStorage.setItem('pagAtual', 'relatorio-veiculo');

    this.formSearch = this.fb.group({
      placa_veiculo: ['', Validators.required]
    });
  }

  search() {
    this.clearSearch();
    return this.as.showEventoForm(this.formSearch.value).subscribe((val: any) => {
      this.evento = val;
    });
  }

  toggleMenu(){
    if(this.menu == 1){
      this.menu = 0;
    } else {
      this.menu = 1;
    }
  }

  clearSearch(){
    this.evento == '';
  }

  redirect(id: any) {
    return this.r.navigate(['relatorio-evento/' + id])
  }
}
