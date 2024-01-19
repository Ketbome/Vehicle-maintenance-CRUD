<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Historico;

class HistoricosTableSeeder extends Seeder
{
    public function run()
    {
        Historico::factory()->count(100)->create();
    }
}
