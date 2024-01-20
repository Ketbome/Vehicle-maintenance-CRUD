<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'apellido', 'email'];

    // Relación con Vehiculo
    public function vehiculos()
    {
        return $this->hasMany(Vehiculo::class, 'id_usuario'); // Un usuario tiene muchos vehiculos
    }

    // Relación con Historico
    public function historicos()
    {
        return $this->hasManyThrough(Historico::class, Vehiculo::class, 'id_usuario', 'id_vehiculo'); // Un usuario tiene muchos historicos a través de vehiculos
    }
}
