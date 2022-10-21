<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reparo_observacao extends Model
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
}
