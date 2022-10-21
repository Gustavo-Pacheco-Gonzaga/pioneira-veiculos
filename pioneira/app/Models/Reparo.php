<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reparo extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'finalizado',
        'data_limite',
        'evento_id',
        'mecanica_id',
        'retorno_id',
        'created_at',
        'updated_at'
    ];

    /**
     * Get the evento that owns the Reparo
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function reparoEvento(): BelongsTo
    {
        return $this->belongsTo('\App\Models\Evento', 'evento_id');
    }

    public function reparoMecanica(): BelongsTo
    {
        return $this->BelongsTo('\App\Models\Mecanica', 'mecanica_id');
    }

    public function reparoComplemento(): HasMany
    {
        return $this->hasMany('\App\Models\Reparo_complemento', 'reparo_id');
    }

    public function reparoObservacao(): HasMany
    {
        return $this->hasMany('\App\Models\Reparo_observacao', 'reparo_id');
    }
}
