<?php

namespace App\Http\Controllers;

use App\Models\Cotacao;
use App\Models\Direcionamento;
use App\Models\Evento;
use App\Models\Mecanica;
use App\Models\Orcamento;
use App\Models\Orcamento_observacao;
use Illuminate\Http\Request;

class OrcamentoController extends Controller
{
    public function createOrcamentoObservacao(Request $request)
    {
        $orcamentoObservacao = new Orcamento_observacao($request->all());
        $orcamentoObservacao->save();
        $orcamentoObservacao->update([
            'hora' => date("H:i:s"),
        ]);
        $orcamentoObservacao->save();

        return $this->message('Observação criada com sucesso.', 200);
    }

    public function createCotacao(Request $request)
    {
        $cotacao = new Cotacao($request->all());
        $cotacao->save();

        $this->updateMecanica($request->get('mecanica_id'));
        $this->updateEventoMecanica($request->get('evento_id'), $request->get('mecanica_id'));
        $this->updateOrcamento($request->get('evento_id'));

        return $this->message('Orçamento aprovado com sucesso.', 200);
    }

    public function updateEventoMecanica($id, $mecanica_id){
        $evento = Evento::where([
            'id' => $id
        ])->first();
        $evento->update([
            'mecanica_id' => $mecanica_id
        ]);
        $evento->save();
    }

    public function updateMecanica($mecanica_id){
        $mecanica = Mecanica::where([
            'id' => $mecanica_id
        ])->first();
        $mecanica->update([
            'qtd' => $mecanica->qtd + 1
        ]);
        $mecanica->save();
    }

    public function updateOrcamento($id)
    {
        $orcamento = Orcamento::where([
            'evento_id' => $id
        ])->get();

        for ($i = 0; $i < sizeof($orcamento); $i++) {
            $orcamento[$i]->update([
                'aprovado' => 1
            ]);
            $orcamento[$i]->save();
        }
    }

    public function showAllOrcamento()
    {
        return Orcamento::with(['orcamentoEvento', 'orcamentoMecanica'])->orderBy('created_at', 'ASC')->get();
    }

    public function showOrcamentoById($id)
    {
        return Orcamento::where([
            'evento_id' => $id,
        ])->with(['orcamentoObservacao', 'orcamentoMecanica'])->get();
    }

    public function message($m, $c)
    {
        return response()->json([
            'mensagem' => $m
        ], $c);
    }
}
