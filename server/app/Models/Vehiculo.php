<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    use HasFactory;

    protected $fillable = ['marca', 'modelo', 'anio', 'id_usuario', 'precio'];

    // Relación con Usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario'); // Un vehiculo pertenece a un usuario
    }

    public function historicos()
    {
        return $this->hasMany(Historico::class, 'id_vehiculo'); // Un vehiculo tiene muchos historicos
    }
}
