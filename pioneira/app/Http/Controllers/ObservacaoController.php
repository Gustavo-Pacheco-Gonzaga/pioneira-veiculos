<?php

namespace App\Http\Controllers;

use App\Models\Cotacao_observacao;
use App\Models\Evento;
use App\Models\Orcamento_observacao;
use App\Models\Recebimento_observacao;
use App\Models\Reparo_complemento;
use App\Models\Reparo_observacao;

class ObservacaoController extends Controller
{
    public function showOrcamentoObservacao($id)
    {
        return Orcamento_observacao::where([
            'orcamento_id' => $id
        ])->orderBy('created_at', 'ASC')->get();
    }

    public function showCotacaoObservacao($id)
    {
        return Cotacao_observacao::where([
            'cotacao_id' => $id
        ])->orderBy('created_at', 'ASC')->get();
    }

    public function showRecebimentoObservacao($id)
    {
        return Recebimento_observacao::where([
            'recebimento_id' => $id
        ])->orderBy('created_at', 'ASC')->get();
    }

    public function showReparoObservacao($id)
    {
        return Reparo_observacao::where([
            'reparo_id' => $id
        ])->orderBy('created_at', 'ASC')->get();
    }

    public function showReparoComplemento($id)
    {
        return Reparo_complemento::where([
            'reparo_id' => $id
        ])->orderBy('created_at', 'ASC')->get();
    }
}
