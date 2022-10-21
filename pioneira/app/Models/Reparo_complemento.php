<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reparo_complemento extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'observacao',
        'reparo_id',
        'created_at',
        'updated_at',
        'hora'
    ];

    /**
     * Get the reparo that owns the Complemento
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function reparoComplemento(): BelongsTo
    {
        return $this->belongsTo('\App\Models\Reparo', 'reparo_id');
    }
}
