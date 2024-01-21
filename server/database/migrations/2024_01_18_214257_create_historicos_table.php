<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoricosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historicos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_usuario');
            $table->unsignedBigInteger('id_vehiculo');
            $table->timestamp('fecha_cambio')->useCurrent();
            $table->foreign('id_vehiculo')->references('id')->on('vehiculos')->onDelete('cascade');
            $table->foreign('id_usuario')->references('id')->on('usuarios')->onDelete('cascade');
            // $table->timestamps();
        });

        Schema::table('historicos', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('historicos');
    }
}
