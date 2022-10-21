<?php

namespace App\Http\Controllers;

use App\Models\Recebimento;
use App\Models\Recebimento_observacao;
use App\Models\Reparo;
use App\Models\Reparo_observacao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RecebimentoController extends Controller
{
    public function showAllRecebimento()
    {
        return Recebimento::with('recebimentoEvento', 'recebimentoMecanica')->orderBy('created_at', 'DESC')->get();
    }

    public function showrecebimentoById($id)
    {
        return Recebimento::where([
            'evento_id' => $id,
        ])->with(['recebimentoObservacao', 'recebimentoMecanica'])->get();
    }

    public function createrecebimentoObservacao(Request $request)
    {
        $recebimentoObservacao = new Recebimento_observacao($request->all());
        $recebimentoObservacao->save();
        $recebimentoObservacao->update([
            'hora' => date("H:i:s"),
        ]);
        $recebimentoObservacao->save();

        return $this->message('Observação criada com sucesso.', 200);
    }

    public function createReparo(Request $request)
    {
        $recebimento = Recebimento::where([
            'evento_id' => $request->get('evento_id')
        ])->get();
        for ($i = 0; $i < sizeof($recebimento); $i++) {
            $recebimento[$i]->update([
                'finalizado' => 1
            ]);
            $recebimento[$i]->save();
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
        $reparo = new Reparo($request->all());
        $reparo->save();

        if ($request->get('observacao') != "") {
            $observacao = new Reparo_observacao([
                'reparo_id' => $reparo->id,
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
