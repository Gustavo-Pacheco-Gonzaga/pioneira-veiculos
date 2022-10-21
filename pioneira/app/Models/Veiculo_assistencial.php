<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Veiculo_assistencial extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'nome_condutor',
        'dias_emprestimo',
        'data_saida',
        'cidade',
        'evento_id',
        'veiculo_empresa_id',
        'cor',
        'created_at',
        'updated_at'
    ];

    /**
     * Get the veiculoEmpresa associated with the Veiculo_assistencial
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function veiculoAssistencialVeiculoEmpresa(): BelongsTo
    {
        return $this->BelongsTo('\App\Models\Veiculo_empresa', 'veiculo_empresa_id');
    }
}
