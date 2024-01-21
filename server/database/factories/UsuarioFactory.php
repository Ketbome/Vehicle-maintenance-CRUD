<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Usuario;
use App\Models\Vehiculo;

class UsuarioFactory extends Factory
{
    public function definition()
    {
        return [
            'nombre'=> $this->faker->firstName,
            'apellidos'=> $this->faker->lastName,
            'email'=> $this->faker->unique()->safeEmail, 
        ];
    }

    public function configure()
    {
        return $this->afterMaking(function (Usuario $usuario) {
            //
        })->afterCreating(function (Usuario $usuario) {
            $usuario->vehiculos()->save(Vehiculo::factory()->make());
        });
    }
}
