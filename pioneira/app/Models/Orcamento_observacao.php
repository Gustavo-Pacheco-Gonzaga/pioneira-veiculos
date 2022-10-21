<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Orcamento_observacao extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'observacao',
        'orcamento_id',
        'created_at',
        'updated_at',
        'hora'
    ];

    /**
     * Get the user associated with the Orcamento_observacao
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function observacaoOrcamento(): BelongsTo
    {
        return $this->BelongsTo('\App\Models\Orcamento', 'orcamento_id');
    }
}
