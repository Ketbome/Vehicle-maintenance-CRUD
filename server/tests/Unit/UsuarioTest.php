<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Usuario;


class UsuarioTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_lists_users()
    {
        $usuarios = Usuario::factory()->count(5)->create();

        $response = $this->getJson('/api/usuarios');

        $response->assertOk();
        $response->assertJsonCount(5);
    }

    public function test_it_creates_a_user()
    {
        $userData = [
            'nombre' => 'Juan',
            'apellidos' => 'Pérez',
            'email' => 'juan@example.com',
        ];

        $response = $this->postJson('/api/usuarios', $userData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('usuarios', ['email' => 'juan@example.com']);
    }

    public function test_it_shows_a_user()
    {
        $usuario = Usuario::factory()->create();

        $response = $this->getJson("/api/usuarios/{$usuario->id}");

        $response->assertOk();
        $response->assertJson([
            'id' => $usuario->id,
            'nombre' => $usuario->nombre,
            'apellidos' => $usuario->apellidos,
        ]);
    }

    public function test_it_updates_a_user()
    {
        $usuario = Usuario::factory()->create();

        $updateData = ['nombre' => 'Nombre Actualizado'];

        $response = $this->putJson("/api/usuarios/{$usuario->id}", $updateData);

        $response->assertOk();
        $this->assertDatabaseHas('usuarios', ['id' => $usuario->id, 'nombre' => 'Nombre Actualizado']);
    }

    public function test_it_returns_users_count()
    {
        $count = Usuario::factory()->count(3)->create()->count();

        $response = $this->getJson('/api/countUsuarios');

        $response->assertOk();
        $response->assertJson(['totalUsuarios' => $count]);
    }
}
