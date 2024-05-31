<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partidos', function (Blueprint $table) {
            $table->id();
            $table->string('campo_id');
            $table->text('descripcion');
            $table->string('tipo');
            $table->date('fecha');
            $table->string('horaEmpezar');
            $table->string('horaTerminar');
            $table->decimal('coste', 8, 2)->default(0.00);
            $table->integer('duracion');
            $table->string('estado')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('partidos');
    }
};
