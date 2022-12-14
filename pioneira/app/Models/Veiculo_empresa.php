<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veiculo_empresa extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'id',
        'modelo',
        'placa',
        'cidade',
        'ativo',
    ];

}
