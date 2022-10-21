<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Recebimento extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'finalizado',
        'data_limite',
        'mecanica_id',
        'evento_id',
        'retorno_id',
        'created_at',
        'updated_at'
    ];

    public function recebimentoEvento(): BelongsTo
    {
        return $this->BelongsTo('\App\Models\Evento', 'evento_id');
    }

    public function recebimentoMecanica(): BelongsTo
    {
        return $this->BelongsTo('\App\Models\Mecanica', 'mecanica_id');
    }

    public function recebimentoObservacao(): HasMany
    {
        return $this->hasMany('\App\Models\Recebimento_observacao', 'recebimento_id');
    }
}
