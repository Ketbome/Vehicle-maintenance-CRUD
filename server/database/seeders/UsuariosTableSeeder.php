<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;

class UsuariosTableSeeder extends Seeder
{
    public function run()
    {
        Usuario::factory()->count(30)->create();
    }
}
