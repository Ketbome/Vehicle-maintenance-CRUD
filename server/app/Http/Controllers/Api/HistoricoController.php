<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Historico;

class HistoricoController extends Controller
{
    public function index()
    {
        return Historico::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id_vehiculo' => 'required|integer',
            'id_usuario' => 'required|integer',
            'fecha_cambio' => 'required|date'
        ]);

        $recurso = Historico::create($validatedData);
        return response()->json($recurso, 201);
    }

    public function show($id)
    {
        $historico = Historico::findOrFail($id);
        return response()->json($historico);
    }

    // Al ser un historico no se puede modificar, por el hecho de que es un registro de un cambio

    public function destroy($id)
    {
        Historico::destroy($id);
        return response()->json(null, 204);
    }

    public function historicosPorVehiculo($idVehiculo)
    {
        $historicos = Historico::where('id_vehiculo', $idVehiculo)->get();
        return response()->json($historicos);
    }

}
