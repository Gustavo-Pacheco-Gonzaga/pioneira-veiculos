import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AgendaComponent } from './agenda/agenda.component';
import { MecanicaComponent } from './mecanica/mecanica.component';
import { GerarEventoComponent } from './gerar-evento/gerar-evento.component';
import { RelatorioVeiculoComponent } from './relatorios/relatorio-veiculo/relatorio-veiculo.component';
import { RelatorioEventoComponent } from './relatorios/relatorio-evento/relatorio-evento.component';
import { VeiculoAssistencialComponent } from './veiculo-assistencial/veiculo-assistencial.component';

const rotas = [
  { path: '', component: AgendaComponent },
  { path: 'mecanica', component: MecanicaComponent },
  { path: 'gerar-evento', component: GerarEventoComponent },
  { path: 'relatorio-evento/:id', component: RelatorioEventoComponent },
  { path: 'relatorio-veiculo', component: RelatorioVeiculoComponent },
  { path: 'veiculo-assistencial', component: VeiculoAssistencialComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(rotas, { useHash: true })
  ]
})
export class CustomRotasModule { }
