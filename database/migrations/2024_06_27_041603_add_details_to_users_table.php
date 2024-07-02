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
        Schema::table('users', function (Blueprint $table) {
            $table->tinyInteger('gender')->nullable(); // 0: Nam, 1: Nữ
            $table->enum('old', ['0-15', '15-25', '25-35', '35-45', '45-55', '55-65', '>65']);
            $table->string('profession')->nullable();
            $table->string('marital_status')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropColumn('gender');
            $table->dropColumn('old');
            $table->dropColumn('profession');
            $table->dropColumn('marital_status');
        });
    }
};
