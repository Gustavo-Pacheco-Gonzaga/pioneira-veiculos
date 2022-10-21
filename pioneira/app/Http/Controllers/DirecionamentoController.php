<?php

namespace App\Http\Controllers;

use App\Models\Direcionamento;
use App\Models\Orcamento;
use App\Models\Orcamento_observacao;
use Illuminate\Http\Request;

class DirecionamentoController extends Controller
{
    public function createOrcamento(Request $request)
    {
        $orcamento = new Orcamento($request->all());
        $orcamento->save();

        if ($request->get('observacao') != "") {
            $observacao = new Orcamento_observacao([
                'orcamento_id' => $orcamento->id,
                'observacao' => $request->get('observacao'),
                'hora' => date("H:i:s"),
            ]);
            $observacao->save();
        }

        $direcionamento = Direcionamento::where([
            'evento_id' => $request->get('evento_id'),
        ])->get();
        for ($i = 0; $i < sizeof($direcionamento); $i++) {
            $direcionamento[$i]->update([
                'finalizado' => 1
            ]);
            $direcionamento[$i]->save();
        }

        return $this->message('Orçamento gerado com sucesso.', 200);
    }

    public function showAllDirecionamento()
    {
        return Direcionamento::with('direcionamentoEvento')->orderBy('created_at', 'ASC')->get();
    }

    public function showDirecionamentoById($id)
    {
        return Direcionamento::where([
            'evento_id' => $id,
        ])->first();
    }

    public function message($m, $c)
    {
        return response()->json([
            'mensagem' => $m
        ], $c);
    }
}
