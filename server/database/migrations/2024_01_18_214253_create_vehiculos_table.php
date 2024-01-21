<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiculosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->id();
            $table->string('marca');
            $table->string('modelo');
            $table->year('anio');
            $table->unsignedBigInteger('id_usuario');
            $table->decimal('precio', 15, 2);
            $table->foreign('id_usuario')->references('id')->on('usuarios')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::table('vehiculos', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('vehiculos');
    }
}
