<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'admin',
            'role' => 'admin',
            'phone' =>'0909909900',
            'address' => '123 Bùi Văn Ba, Tân Thuận Đông, Q.7, tp.HCM',
            'status'=>'0',
            'password'=>'12345678',
            'email' => 'admin@vietstats.vn',
        ]);
        $regions =[
            ['code'=>77, 'name' => 'Bà Rịa - Vũng Tàu', 'full_name'=>'Tỉnh Bà Rịa - Vũng Tàu','full_name_en'=>'Ba Ria - Vung Tau Province']
        ];
        DB::table('regions')->insert($regions);
        $districts = [
            ['name' => 'Vũng Tàu', 'full_name' => 'Thành phố Vũng Tàu', 'full_name_en' => 'Vung Tau City', 'regions_code' => '77'],
            ['name' => 'Bà Rịa', 'full_name' => 'Thành phố Bà Rịa', 'full_name_en' => 'Ba Ria City', 'regions_code' => '77'],
            ['name' => 'Châu Đức', 'full_name' => 'Huyện Châu Đức', 'full_name_en' => 'Chau Duc District', 'regions_code' => '77'],
            ['name' => 'Xuyên Mộc', 'full_name' => 'Huyện Xuyên Mộc', 'full_name_en' => 'Xuyen Moc District', 'regions_code' => '77'],
            ['name' => 'Long Điền', 'full_name' => 'Huyện Long Điền', 'full_name_en' => 'Long Dien District', 'regions_code' => '77'],
            ['name' => 'Đất Đỏ', 'full_name' => 'Huyện Đất Đỏ', 'full_name_en' => 'Dat Do District', 'regions_code' => '77'],
            ['name' => 'Phú Mỹ', 'full_name' => 'Thị xã Phú Mỹ', 'full_name_en' => 'Phu My Town', 'regions_code' => '77'],
            ['name' => 'Côn Đảo', 'full_name' => 'Huyện Côn Đảo', 'full_name_en' => 'Con Dao District', 'regions_code' => '77'],
        ];

        // Insert data into the 'districts' table
        DB::table('districts')->insert($districts);
        $indicators = [
            ['name' => 'Thu nhập và của cải', 'descriptions' => 'Thu nhập và của cải'],
            ['name' => 'Việc làm', 'descriptions' => 'Việc làm'],
            ['name' => 'Sức khỏe', 'descriptions' => 'Sức khỏe'],
            ['name' => 'Kiến thức và kỹ năng', 'descriptions' => 'Kiến thức và kỹ năng'],
            ['name' => 'Nhà ở và tiện nghi', 'descriptions' => 'Nhà ở và tiện nghi'],
            ['name' => 'Cảm nhận phúc lợi', 'descriptions' => 'Cảm nhận phúc lợi'],
            ['name' => 'Môi trường', 'descriptions' => 'Môi trường'],
            ['name' => 'An ninh, an toàn', 'descriptions' => 'An ninh, an toàn'],
            ['name' => 'Công việc và cuộc sống', 'descriptions' => 'Công việc và cuộc sống'],
            ['name' => 'Cố kết cộng đồng', 'descriptions' => 'Cố kết cộng đồng'],
            ['name' => 'Sự tham gia của người dân', 'descriptions' => 'Sự tham gia của người dân'],
            ['name' => 'Hành chính và quản trị công', 'descriptions' => 'Hành chính và quản trị công'],
        ];

        // Insert data into the 'weights' table
        DB::table('indicators')->insert($indicators);
        $regions = [
            [
                'code' => '77', // You should replace 'VT' with the actual code if available
                'name' => 'Bà Rịa - Vũng Tàu',
                'full_name' => 'Tỉnh Bà Rịa - Vũng Tàu',
                'full_name_en' => 'Ba Ria - Vung Tau Province'
            ],
            // ... Add more regions if necessary
        ];

        // Insert data into the 'regions' table
        DB::table('regions')->insert($regions);
        // Define the data to be seeded
        $weights = [
            ['name' => 'Thu nhập và của cải', 'value' => '20.0%','indicators_id'=>1],
            ['name' => 'Việc làm', 'value' => '12.0%','indicators_id'=>2],
            ['name' => 'Sức khỏe', 'value' => '12.0%','indicators_id'=>3],
            ['name' => 'Kiến thức và kỹ năng', 'value' => '12.0%','indicators_id'=>4],
            ['name' => 'Nhà ở và tiện nghi', 'value' => '7.0%','indicators_id'=>5],
            ['name' => 'Cảm nhận phúc lợi', 'value' => '7.0%','indicators_id'=>6],
            ['name' => 'Môi trường', 'value' => '5.0%','indicators_id'=>7],
            ['name' => 'An ninh, an toàn', 'value' => '5.0%','indicators_id'=>8],
            ['name' => 'Công việc và cuộc sống', 'value' => '5.0%','indicators_id'=>9],
            ['name' => 'Cố kết cộng đồng', 'value' => '5.0%','indicators_id'=>10],
            ['name' => 'Sự tham gia của người dân', 'value' => '5.0%','indicators_id'=>11],
            ['name' => 'Hành chính và quản trị công', 'value' => '5.0%','indicators_id'=>12],
        ];

        // Insert data into the 'weights' table
        DB::table('weights')->insert($weights);

        $populationsData = [
            ['districts_id' => 1, 'value' => 300000],
            ['districts_id' => 2, 'value' => 200000],
            ['districts_id' => 3, 'value' => 150000],
            ['districts_id' => 4, 'value' => 120000],
            ['districts_id' => 5, 'value' => 180000],
            ['districts_id' => 6, 'value' => 90000],
            ['districts_id' => 7, 'value' => 110000],
            ['districts_id' => 8, 'value' => 80000],
            // Thêm các mẫu dữ liệu khác nếu cần
        ];
        DB::table('populations')->insert($populationsData);

        $questions = [
            ['question_code' => 'I.1a', 'title' => 'Mức độ hài lòng của ông/bà đối với thu nhập hiện tại của mình như thế nào?', 'indicator_id' => 1],
            ['question_code' => 'I.1b', 'title' => 'Cảm nhận về sự an tâm của ông/bà đối với của cải tích lũy nếu giả sử không may gặp rủi ro trong cuộc sống thế nào?', 'indicator_id' => 1],
            ['question_code' => 'I.2a', 'title' => 'Ông/bà đánh giá thế nào về sự ổn định trong công việc hiện tại của mình?', 'indicator_id' => 2],
            ['question_code' => 'I.2b', 'title' => 'Ông/bà đánh giá về mức độ tuân thủ của công ty đối với tiền lương và chính sách bảo hiểm cho người lao động như thế nào?', 'indicator_id' => 2],
            ['question_code' => 'I.2c', 'title' => 'Mức độ hài lòng của ông/bà đối với công việc hiện tại như thế nào?', 'indicator_id' => 2],
            ['question_code' => 'I.3a', 'title' => 'Mức độ hài lòng của ông/bà đối với chỗ ở hiện tại của mình như thế nào?', 'indicator_id' => 3],
            ['question_code' => 'I.3b', 'title' => 'Mức độ đáp ứng về chỗ ngủ cho tất cả các thành viên trong gia đình ông/bà như thế nào?', 'indicator_id' => 3],
            ['question_code' => 'I.3c', 'title' => 'Mức độ đáp ứng nhu cầu sống của các tiện nghi vật chất trong gia đình ông/bà thế nào (ví dụ như tivi, tủ lạnh, máy giặt, máy điều hòa…)?', 'indicator_id' => 3],
            ['question_code' => 'I.4a', 'title' => 'Mức độ hài lòng của ông/bà đối với chất lượng hoạt động chăm sóc sức khỏe và y tế ở địa phương mình thế nào (huyện/thị xã, thành phố)?', 'indicator_id' => 4],
            ['question_code' => 'I.4b', 'title' => 'Ông/bà tự nhận xét về tình trạng sức khỏe hiện tại của mình như thế nào?', 'indicator_id' => 4],
            ['question_code' => 'I.5a', 'title' => 'Ông/bà tự nhận xét về trình độ kiến thức, kỹ năng và kinh nghiệm của mình ở mức độ nào?', 'indicator_id' => 5],
            ['question_code' => 'I.5b', 'title' => 'Mức độ hài lòng của ông/bà đối với chất lượng giáo dục ở địa phương như thế nào?', 'indicator_id' => 5],
            ['question_code' => 'I.6a', 'title' => 'Ông/bà đánh giá chất lượng môi trường tự nhiên (không khí, nguồn nước) của địa phương mình như thế nào?', 'indicator_id' => 6],
            ['question_code' => 'I.6b', 'title' => 'Cảm nhận chung của ông/bà về môi trường sống ở địa phương thế nào?', 'indicator_id' => 6],
            ['question_code' => 'I.7a', 'title' => 'Mức độ hài lòng của ông/bà về phúc lợi hiện tại của mình và gia đình thế nào?', 'indicator_id' => 7],
            ['question_code' => 'I.7b', 'title' => 'Ông/bà đánh giá các chính sách phúc lợi của nhà nước đối với người dân địa phương tốt ở mức nào?', 'indicator_id' => 7],
            ['question_code' => 'I.8a', 'title' => 'Ông/bà đánh giá về mức độ an ninh ở địa phương như thế nào?', 'indicator_id' => 8],
            ['question_code' => 'I.8b', 'title' => 'Ông/bà cảm nhận thế nào về sự an toàn (tính mạng, tài sản) của mình ở địa phương?', 'indicator_id' => 8],
            ['question_code' => 'I.9a', 'title' => 'Ngoài công việc, ông/bà có thời gian dành cho việc nghỉ ngơi (thời gian riêng tư cho bản thân và gia đình) không?', 'indicator_id' => 9],
            ['question_code' => 'I.9b', 'title' => 'Ông/bà nhận thấy giữa công việc và cuộc sống của mình có thực sự cân bằng không?', 'indicator_id' => 9],
            ['question_code' => 'I.10a', 'title' => 'Ông/bà nhận thấy cộng đồng mình đang sống có đoàn kết, gắn bó tương trợ nhau tốt không?', 'indicator_id' => 10],
            ['question_code' => 'I.10b', 'title' => 'Trong tổ dân phố của mình đang sinh sống, ông/bà biết tên khoảng bao nhiêu % người trong tổ?', 'indicator_id' => 10],
            ['question_code' => 'I.11a', 'title' => 'Ông/bà thấy các ý kiến, kiến nghị của người dân được chính quyền tôn trọng, lắng nghe và tiếp thu như thế nào?', 'indicator_id' => 11],
            ['question_code' => 'I.11b', 'title' => 'Người dân địa phương có thường xuyên được tạo điều kiện tham gia vào các hoạt động của chính quyền địa phương (ví dụ như góp ý, giám sát) hoặc các hoạt động công cộng không?', 'indicator_id' => 11],
            ['question_code' => 'I.12a', 'title' => 'Ông/bà đánh giá về tính hiệu quả của chính quyền địa phương trong việc hỗ trợ người dân giải quyết việc làm và tăng thu nhập như thế nào?', 'indicator_id' => 12],
            ['question_code' => 'I.12b', 'title' => 'Ông/bà nhận thấy thế nào về mức độ quan tâm và hỗ trợ của chính quyền đối với đời sống của người dân ở địa phương?', 'indicator_id' => 12],
        ];

        foreach ($questions as $question) {
            DB::table('questions')->insert([
                'question_code' => $question['question_code'],
                'title' => $question['title'],
                'indicator_id' => $question['indicator_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
