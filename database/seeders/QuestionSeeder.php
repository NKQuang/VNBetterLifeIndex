<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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
