<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Usuario;

class VehiculoFactory extends Factory
{
    public function definition()
    {
        return [
            'marca' => $this->faker->randomElement(['Toyota', 'Ford', 'Chevrolet', 'Nissan', 'Hiunday', 'Tesla']),
            'modelo' => $this->faker->bothify('##????'), 
            'anio' => $this->faker->numberBetween($min = 1990, $max = 2021),
            'id_usuario' => Usuario::inRandomOrder()->first()->id ?? null,
            'precio' => $this->faker->numberBetween(5000000, 30000000)
        ];
    }
}

