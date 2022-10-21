<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use App\Models\Reparo;
use App\Models\Reparo_complemento;
use App\Models\Reparo_observacao;
use Illuminate\Http\Request;

class ReparoController extends Controller
{
    public function createReparoComplemento(Request $request)
    {
        $reparoComplemento = new Reparo_complemento($request->all());
        $reparoComplemento->save();
        $reparoComplemento->update([
            'hora' => date("H:i:s"),
        ]);
        $reparoComplemento->save();

        return $this->message('Complemento gerado com sucesso.', 200);
    }

    public function createReparoObservacao(Request $request)
    {
        $reparoObservacao = new Reparo_observacao($request->all());
        $reparoObservacao->save();
        $reparoObservacao->update([
            'hora' => date("H:i:s"),
        ]);
        $reparoObservacao->save();
        
        return $this->message('Complemento gerado com sucesso.', 200);
    }

    public function finalizarReparo(Request $request)
    {
        $reparo = Reparo::where([
            'evento_id' => $request->get('evento_id')
        ])->get();
        for ($i = 0; $i < sizeof($reparo); $i++) {
            $reparo[$i]->update([
                'finalizado' => 1
            ]);
            $reparo[$i]->save();
        }

        $evento = Evento::where([
            'id' => $request->get('evento_id')
        ])->first();
        $evento->update([
            'finalizado' => 1
        ]);
        $evento->save();

        return $this->message('Reparo finalizado, o relatório do evento ainda pode ser acessado.', 200);
    }

    public function showAllReparo()
    {
        return Reparo::with(['reparoEvento', 'reparoMecanica'])->orderBy('created_at', 'DESC')->get();
    }

    public function showReparoById($id)
    {
        return Reparo::where([
            'evento_id' => $id,
        ])->with(['reparoComplemento', 'reparoObservacao', 'reparoMecanica'])->get();
    }

    public function message($m, $c)
    {
        return response()->json([
            'mensagem' => $m
        ], $c);
    }
}
