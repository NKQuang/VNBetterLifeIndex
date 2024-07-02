<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class IndicatorsValuesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $insertData = [];

        for ($i = 0; $i < 10000; $i++) {
            $insertData[] = [
                'name' => $faker->word,
                'value' => $faker->randomFloat(2, 0, 10),
                'type' => 0,
                'districts_id' => $faker->numberBetween(1, 8), // Giả sử bạn có 100 huyện
                'question_code' => 'I.2b',
                'user_id' => $faker->numberBetween(1, 3), // Giả sử bạn có 100 người dùng
                'created_at' => now(),
                'updated_at' => now(),
            ];

            // Chèn dữ liệu sau mỗi 1000 dòng để tránh lỗi hết bộ nhớ
            if (count($insertData) == 1000) {
                DB::table('indicators_values')->insert($insertData);
                $insertData = [];
            }
        }

        // Chèn bất kỳ dữ liệu còn lại nào
        if (!empty($insertData)) {
            DB::table('indicators_values')->insert($insertData);
        }
    }
}
