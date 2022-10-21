import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomRotasModule } from './custom-rotas.module';

import { AppComponent } from './app.component';
import { AgendaComponent } from './agenda/agenda.component';
import { MecanicaComponent } from './mecanica/mecanica.component';
import { GerarEventoComponent } from './gerar-evento/gerar-evento.component';
import { RelatorioVeiculoComponent } from './relatorios/relatorio-veiculo/relatorio-veiculo.component';
import { RelatorioEventoComponent } from './relatorios/relatorio-evento/relatorio-evento.component';
import { VeiculoAssistencialComponent } from './veiculo-assistencial/veiculo-assistencial.component';

@NgModule({
  declarations: [
    AppComponent,

    AgendaComponent,

    MecanicaComponent,

    GerarEventoComponent,

    RelatorioEventoComponent,
    RelatorioVeiculoComponent,
    
    VeiculoAssistencialComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CustomRotasModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
