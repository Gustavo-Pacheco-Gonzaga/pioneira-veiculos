<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Retorno extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'evento_id',
        'observacao',
        'created_at',
        'updated_at'
    ];
}
