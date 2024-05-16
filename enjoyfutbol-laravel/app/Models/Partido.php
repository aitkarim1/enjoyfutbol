<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partido extends Model
{
    use HasFactory;

    protected $table = 'partidos';

    protected $fillable = [
        'campo_id',
        'campo_nombre',
        'campo_ubicacion',
        'ciudad',
        'jugadores',
        'tipo',
        'fecha',
        'hora',
        'duracion',
    ];

    // Relación con el modelo Campo
    public function campo()
    {
        return $this->belongsTo(Campo::class);
    }
}
