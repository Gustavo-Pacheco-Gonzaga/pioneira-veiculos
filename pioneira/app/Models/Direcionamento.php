<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Direcionamento extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'finalizado',
        'evento_id',
        'retorno_id',
        'created_at',
        'updated_at'
    ];

    /**
     * Get the evento that owns the Complemento
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function direcionamentoEvento()
    {
        return $this->belongsTo('\App\Models\Evento', 'evento_id');
    }
}
