<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\VehiculoController;
use App\Http\Controllers\Api\HistoricoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('usuarios', UsuarioController::class);
Route::apiResource('vehiculos', VehiculoController::class);
Route::apiResource('historicos', HistoricoController::class);


Route::get('/findHistoricalVehicle/{idVehiculo}', [HistoricoController::class, 'historicosPorVehiculo']);
Route::get('/findVehiclesUser/{idUsuario}', [VehiculoController::class, 'vehiculosPorUsuario']);
Route::get('/countUsuarios', [UsuarioController::class, 'count']);

