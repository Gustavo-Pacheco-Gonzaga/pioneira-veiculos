<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mecanica extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'id',
        'nome',
        'cidade',
        'cor',
        'qtd',
    ];

    public function mecanicaEvento() : HasMany
    {
        return $this->HasMany('\App\Models\Evento', 'mecanica_id');
    }

}
