<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vehiculo;
use App\Models\Historico;

class VehiculoController extends Controller
{
    public function index(Request $request)
    {
        $start = $request->query('start', 0); // Comenzar en el registro 20 por defecto
        $limit = $request->query('limit', 200); // Límite de 10 registros por defecto

        return Vehiculo::skip($start)->take($limit)->get();
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

        
        // Crear el nuevo vehículo
        $vehiculo = Vehiculo::create($validatedData);

        // Crear un registro en el historial para el nuevo vehículo
        Historico::create([
            'id_vehiculo' => $vehiculo->id,
            'id_usuario' => $vehiculo->id_usuario,
            'fecha_cambio' => now(), // La fecha de creación del vehículo
        ]);

        return response()->json($vehiculo, 201);
    }

    public function show($id)
    {
        $vehiculo = Vehiculo::findOrFail($id);
        return response()->json($vehiculo);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'modelo' => 'sometimes|required|max:255',
            'id_usuario' => 'sometimes|exists:usuarios,id|integer',
            'precio' => 'sometimes|required|numeric'
        ]);

        $vehiculo = Vehiculo::findOrFail($id);

        // Comprueba si el id_usuario está cambiando
        if ($request->has('id_usuario') && $vehiculo->id_usuario != $request->id_usuario) {
            // Crear un nuevo registro en el historial
            Historico::create([
                'id_usuario' => $request->id_usuario,
                'id_vehiculo' => $id,
                'fecha_cambio' => now(),
            ]);
        }

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
