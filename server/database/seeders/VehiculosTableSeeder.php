<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehiculo;
use App\Models\Historico;

class VehiculosTableSeeder extends Seeder
{
    public function run()
    {
        Vehiculo::factory()->count(30)->create()->each(function ($vehiculo) {
            Historico::factory()->create([
                'id_usuario' => $vehiculo->id_usuario,
                'id_vehiculo' => $vehiculo->id,
                'fecha_cambio' => $vehiculo->created_at,
            ]);
        });
    }
}
