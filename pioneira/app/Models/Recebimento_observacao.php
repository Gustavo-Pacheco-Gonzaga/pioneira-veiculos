<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Recebimento_observacao extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'observacao',
        'recebimento_id',
        'created_at',
        'updated_at',
        'hora'
    ];

 
    public function observacaoRecebimento(): BelongsTo
    {
        return $this->BelongsTo('\App\Models\Orcamento', 'orcamento_id');
    }
}
