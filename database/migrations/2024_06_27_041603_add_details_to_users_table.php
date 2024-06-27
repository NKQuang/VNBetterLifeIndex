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
            $table->tinyInteger('gender')->default(0);
            $table->integer('old')->nullable();
            $table->string('profession')->nullable();
            $table->unsignedBigInteger('district_id')->nullable();
            $table->unsignedBigInteger('region_id')->nullable();

            // Thiết lập khóa ngoại
            $table->foreign('district_id')->references('id')->on('districts')->onDelete('set null');
            $table->foreign('region_id')->references('id')->on('regions')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['district_id']);
            $table->dropForeign(['region_id']);
            $table->dropColumn('gender');
            $table->dropColumn('age_group');
            $table->dropColumn('education');
            $table->dropColumn('occupation');
            $table->dropColumn('family_status');
            $table->dropColumn('district_id');
            $table->dropColumn('region_id');
        });
    }
};
