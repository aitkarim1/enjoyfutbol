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
        'descripcion',
        'tipo',
        'fecha',
        'horaEmpezar',
        'horaTerminar',
        'coste',
        'duracion',
        'estado',
    ];

    // Relación con el modelo Campo
    public function campo()
    {
        return $this->belongsTo(Campo::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'partido_usuario');
    }
}
