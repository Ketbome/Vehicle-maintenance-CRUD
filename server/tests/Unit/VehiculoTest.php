<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Vehiculo;
use App\Models\Usuario;

class VehiculoTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function test_it_lists_vehicles()
    {
        // Crear un usuario primero
        $usuario = Usuario::factory()->create();
        $vehiculos = Vehiculo::factory()->count(5)->create(['id_usuario' => $usuario->id]);

        $response = $this->getJson('/api/vehiculos');

        $response->assertOk();
        $response->assertJsonCount(5, 'data');
    }

    public function test_it_creates_a_vehicle()
    {
        $usuario = Usuario::factory()->create();

        $vehiculoData = [
            'marca' => 'Toyota',
            'modelo' => 'Corolla',
            'anio' => 2020,
            'id_usuario' => $usuario->id,
            'precio' => 10000
        ];

        $response = $this->postJson('/api/vehiculos', $vehiculoData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('vehiculos', ['modelo' => 'Corolla']);
    }

    public function test_it_shows_a_vehicle()
    {
        $usuario = Usuario::factory()->create();
        $vehiculo = Vehiculo::factory()->create();

        $response = $this->getJson("/api/vehiculos/{$vehiculo->id}");

        $response->assertOk();
        $response->assertJson([
            'id' => $vehiculo->id,
            'marca' => $vehiculo->marca,
            'modelo' => $vehiculo->modelo,
            'id_usuario' => $vehiculo->id_usuario,
            'anio' => $vehiculo->anio,
            'precio' => $vehiculo->precio,
        ]);
    }

    public function test_it_updates_a_vehicle()
    {
        $usuario = Usuario::factory()->create();
        $vehiculo = Vehiculo::factory()->create();
        $nuevoPrecio = 15000;

        $response = $this->putJson('/api/vehiculos/'.$vehiculo->id, [
            'precio' => $nuevoPrecio
        ]);

        $response->assertOk();
        $this->assertDatabaseHas('vehiculos', [
            'id' => $vehiculo->id,
            'precio' => $nuevoPrecio
        ]);
    }

    public function test_it_deletes_a_vehicle()
    {
        $usuario = Usuario::factory()->create();
        $vehiculo = Vehiculo::factory()->create();
    
        $this->delete("/ruta-para-eliminar-vehiculo/{$vehiculo->id}");
    
        $vehiculoFresco = Vehiculo::withTrashed()->find($vehiculo->id);
        $this->assertNotNull($vehiculoFresco->deleted_at);
    
        $this->assertSoftDeleted('vehiculos', ['id' => $vehiculo->id]);
    }

    public function test_it_lists_vehicles_for_a_user()
    {
        $usuario = Usuario::factory()->create();
        $vehiculos = Vehiculo::factory()->count(3)->create(['id_usuario' => $usuario->id]);

        $response = $this->getJson("/api/findVehiclesUser/{$usuario->id}");

        $response->assertOk();
        $response->assertJsonCount(3, 'data');
    }
}
