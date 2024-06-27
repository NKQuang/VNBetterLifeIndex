<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserInfoToIndicatorsValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
    */
    public function up()
    {
        Schema::table('indicators_values', function (Blueprint $table) {
            $table->string('full_name')->nullable();
            $table->tinyInteger('gender')->nullable(); // 0: Nam, 1: Nữ
            $table->string('phone_number')->nullable();
            $table->enum('old', ['0-15', '15-25', '25-35', '35-45', '45-55', '55-65', '>65']);
            $table->string('profession')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('indicators_values', function (Blueprint $table) {
            $table->dropColumn(['full_name', 'gender', 'phone_number', 'address', 'old', 'profession']);
        });
    }
}
