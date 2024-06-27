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
            $table->string('address')->nullable();
            $table->integer('old')->nullable();
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
