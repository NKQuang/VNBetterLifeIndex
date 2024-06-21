<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('indicators_values', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->double('value');
            $table->boolean('type');
            $table->unsignedBigInteger('districts_id');
            $table->string('question_code');
            $table->unsignedBigInteger('user_id')->nullable();

            $table->foreign('districts_id')->references('id')->on('districts');
            $table->foreign('user_id')->references('id')->on('users');

            $table->foreign('question_code')->references('question_code')->on('questions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('indicators_values');
    }
};
