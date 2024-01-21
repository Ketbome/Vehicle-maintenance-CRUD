<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function index(Request $request)
    {
        $start = $request->query('start', 0); // Comenzar en el registro 20 por defecto
        $limit = $request->query('limit', 200); // Límite de 10 registros por defecto

        return Usuario::skip($start)->take($limit)->get();
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|max:255',
            'apellidos' => 'required|max:255',
            'email' => 'required|email|unique:usuarios',
        ]);

        $recurso = Usuario::create($validatedData);
        return response()->json($recurso, 201);
    }


    public function show($id)
    {
        $usuario = Usuario::findOrFail($id);
        return response()->json($usuario);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombre' => 'sometimes|required|max:255',
            'apellidos' => 'sometimes|required|max:255',
            'email' => 'sometimes|required|email|unique:usuarios',
        ]);

        $usuario = Usuario::findOrFail($id);
        $usuario->update($validatedData);
        return response()->json($usuario);
    }

    public function destroy($id)
    {
        Usuario::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    public function count()
    {
        $userCount = Usuario::count();
        return response()->json(['totalUsuarios' => $userCount]);
    }
}
