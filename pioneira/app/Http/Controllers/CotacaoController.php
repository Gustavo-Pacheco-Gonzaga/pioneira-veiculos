<?php

namespace App\Http\Controllers;

use App\Models\Cotacao;
use App\Models\Cotacao_observacao;
use App\Models\Recebimento;
use App\Models\Recebimento_observacao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CotacaoController extends Controller
{
    public function showAllCotacao()
    {
        return Cotacao::with('cotacaoEvento', 'cotacaoMecanica')->orderBy('created_at', 'DESC')->get();
    }

    public function showCotacaoById($id)
    {
        return Cotacao::where([
            'evento_id' => $id,
        ])->with(['cotacaoObservacao', 'cotacaoMecanica'])->get();
    }

    public function createCotacaoObservacao(Request $request)
    {
        $cotacaoObservacao = new Cotacao_observacao($request->all());
        $cotacaoObservacao->save();
        $cotacaoObservacao->update([
            'hora' => date("H:i:s"),
        ]);
        $cotacaoObservacao->save();

        return $this->message('Observação criada com sucesso.', 200);
    }

    public function createRecebimento(Request $request)
    {
        $cotacao = Cotacao::where([
            'evento_id' => $request->get('evento_id')
        ])->get();
        for ($i = 0; $i < sizeof($cotacao); $i++) {
            $cotacao[$i]->update([
                'finalizado' => 1
            ]);
            $cotacao[$i]->save();
        }

        $validator = Validator::make(
            $request->all(),
            [
                'data_limite' => 'required',
            ],
            [
                'required' => 'O campo :attribute é obrigatório',
            ],
        );

        if ($validator->fails()) {
            return $this->message($validator->errors(), 400);
        }
        $recebimento = new Recebimento($request->all());
        $recebimento->save();

        if ($request->get('observacao') != "") {
            $observacao = new Recebimento_observacao([
                'recebimento_id' => $recebimento->id,
                'observacao' => $request->get('observacao'),
                'hora' => date("H:i:s"),
            ]);
            $observacao->save();
        }

        return $this->message('Item movido para a área de reparo.', 200);
    }

    public function message($m, $c)
    {
        return response()->json([
            'mensagem' => $m
        ], $c);
    }
}
