<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cotacao extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'finalizado',
        'evento_id',
        'mecanica_id',
        'retorno_id',
        'created_at',
        'updated_at'
    ];

    /**
     * Get the user that owns the Cotacao
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function cotacaoEvento(): BelongsTo
    {
        return $this->belongsTo('\App\Models\Evento', 'evento_id');
    }

    public function cotacaoMecanica(): BelongsTo
    {
        return $this->BelongsTo('\App\Models\Mecanica', 'mecanica_id');
    }

    public function cotacaoObservacao(): HasMany{
        return $this->hasMany('\App\Models\Cotacao_observacao', 'cotacao_id');
    }
}
