<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Historico extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['id_vehiculo', 'id_usuario', 'fecha_cambio'];

    // Relación con Vehiculo
    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo'); // Un historico pertenece a un vehiculo
    }

    // Relación con Usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario'); // Un historico pertenece a un usuario
    }
}
