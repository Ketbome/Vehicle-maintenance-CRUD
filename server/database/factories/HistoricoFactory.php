<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Usuario;
use App\Models\Vehiculo;

class HistoricoFactory extends Factory
{
    public function definition()
    {
        $usuarioId = Usuario::query()->inRandomOrder()->value('id') ?? Usuario::factory()->create()->id;
        $vehiculoId = Vehiculo::query()->inRandomOrder()->value('id') ?? Vehiculo::factory()->create()->id;

        return [
            'id_usuario' => $usuarioId,
            'id_vehiculo' => $vehiculoId,
            'fecha_cambio' => $this->faker->dateTimeBetween($startDate = '-30 years', $endDate = 'now', $timezone = null),
        ];
    }
}
