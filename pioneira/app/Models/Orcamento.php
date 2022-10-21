<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Orcamento extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'aprovado',
        'mecanica_id',
        'evento_id',
        'retorno_id',
        'created_at',
        'updated_at'
    ];

    public function orcamentoEvento(): BelongsTo
    {
        return $this->BelongsTo('\App\Models\Evento', 'evento_id');
    }

    public function orcamentoMecanica(): BelongsTo
    {
        return $this->BelongsTo('\App\Models\Mecanica', 'mecanica_id');
    }

    public function orcamentoObservacao(): HasMany{
        return $this->hasMany('\App\Models\Orcamento_observacao', 'orcamento_id');
    }
}
