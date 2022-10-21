<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Evento extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'id',
        'numero_evento',
        'placa_veiculo',
        'modelo_veiculo',
        'data_abertura',
        'descricao',
        'cor',
        'orcamento',
        'mecanica_id',
        'finalizado',
        'observacao_finalizado',
        'veiculo_assistencial',
        'show_veiculo',
    ];
}
