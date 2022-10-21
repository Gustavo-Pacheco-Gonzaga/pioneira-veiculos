<?php

namespace App\Http\Controllers;

use App\Models\Direcionamento;
use App\Models\Evento;
use App\Models\Retorno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventoController extends Controller
{
    public function createEvento(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'numero_evento' => 'required',
                'placa_veiculo' => 'required',
                'modelo_veiculo' => 'required',
                'data_abertura' => 'required|date',
            ],
            [
                'required' => 'O campo :attribute é obrigatório',
                'date' => 'O campo :attribute requer o formato yyyy-mm-dd',
            ],
        );

        if ($validator->fails()) {
            return $this->message($validator->errors(), 400);
        }

        $evento = new Evento([
            'numero_evento' => $request->get('numero_evento'),
            'placa_veiculo' => $request->get('placa_veiculo'),
            'modelo_veiculo' => $request->get('modelo_veiculo'),
            'data_abertura' => $request->get('data_abertura'),
            'descricao' => $request->get('descricao'),
            'cor' => $this->randomColor(),
            'finalizado' => 0,
            'veiculo_assistencial' => $request->get('veiculo_assistencial'),
        ]);
        $evento->save();
        $direcionamento = new Direcionamento([
            'finalizado' => 0,
            'evento_id' => $evento->id,
        ]);
        $direcionamento->save();
        return $this->message('Evento criado com sucesso.', 200);
    }

    public function finalizarEvento($id, Request $request)
    {
        $evento = Evento::where([
            'id' => $id
        ])->first();

        $evento->update([
            'finalizado' => 1,
            'observacao_finalizado' => $request->get('observacao_finalizado')
        ]);
        $evento->save();

        return $this->message('Evento encerrado com sucesso.', 200);
    }

    public function createRetorno(Request $request)
    {
        $retorno = new Retorno($request->all());
        $retorno->save();

        $direcionamento = new Direcionamento([
            'finalizado' => 0,
            'retorno_id' => $retorno->id,
            'evento_id' => $request->get('evento_id'),
        ]);
        $direcionamento->save();

        $evento = Evento::where([
            'id' => $request->get('evento_id')
        ])->first();
        $evento->update([
            'finalizado' => 0,
            'mecanica_id' => null
        ]);
        $evento->save();

        return $this->message('Retorno criado com sucesso.', 200);
    }

    public function showRetornoById($id)
    {
        return Retorno::where([
            'evento_id' => $id
        ])->get();
    }

    // Retorna todos os eventos
    public function showAllEvento()
    {
        return Evento::orderBy('data_abertura', 'ASC')->get();
    }

    // Retorna uma lista com os eventos relacionados a placa do veiculo
    public function showEventoByForm(Request $request)
    {
        return Evento::where([
            'placa_veiculo' => $request->get('placa_veiculo'),
        ])->orderBy('data_abertura', 'DESC')->get();
    }

    // Retorna o evento com o id solicitado
    public function showEventoById($id)
    {
        return Evento::where([
            'id' => $id,
        ])->first();
    }

    public function changeEventoDate($id)
    {
        $evento = Evento::where([
            'id' => $id
        ])->first();

        if ($evento) {
            $evento->update([
                'orcamento' => 1
            ]);
            $evento->save();
        }
    }

    public function removeVeiculoEvento($id)
    {
        $evento = Evento::where([
            'id' => $id
        ])->first();

        if ($evento) {
            $evento->update([
                'show_veiculo' => 1
            ]);
            $evento->save();
        }
        return $this->message('Evento removido com sucesso.', 200);
    }

    public function message($m, $c)
    {
        return response()->json([
            'mensagem' => $m
        ], $c);
    }

    public function randomColor()
    {
        $str = '#';
        for ($i = 0; $i < 3; $i++) {
            $str .= dechex(rand(50, 200));
        }
        return $str;
    }
}
