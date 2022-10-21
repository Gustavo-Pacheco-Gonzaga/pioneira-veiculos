<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cotacao_observacao extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'observacao',
        'cotacao_id',
        'created_at',
        'updated_at',
        'hora'
    ];

    /**
     * Get the user that owns the Cotacao_observacao
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function observacaoCotacao(): BelongsTo
    {
        return $this->belongsTo('\App\Models\Cotacao', 'cotacao_id');
    }
}
