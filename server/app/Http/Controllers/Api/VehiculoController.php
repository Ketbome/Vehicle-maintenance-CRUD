<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vehiculo;

class VehiculoController extends Controller
{
    public function index()
    {
        return Vehiculo::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'marca' => 'required|max:255',
            'modelo' => 'required|max:255',
            'anio' => 'required|integer',
            'id_usuario' => 'required|integer',
            'precio' => 'required|numeric'
        ]);

        $recurso = Vehiculo::create($validatedData);
        return response()->json($recurso, 201);
    }

    public function show($id)
    {
        $vehiculo = Vehiculo::findOrFail($id);
        return response()->json($vehiculo);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'modelo' => 'sometimes:required|max:255',
            'id_usuario' => 'sometimes|exists:required|integer',
            'precio' => 'sometimes:required|numeric'
        ]);

        $vehiculo = Vehiculo::findOrFail($id);
        $vehiculo->update($validatedData);
        return response()->json($vehiculo);
    }

    public function destroy($id)
    {
        Vehiculo::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    public function vehiculosPorUsuario($idUsuario)
    {
        $vehiculos = Vehiculo::where('id_usuario', $idUsuario)->get();
        return response()->json($vehiculos);
    }

}
