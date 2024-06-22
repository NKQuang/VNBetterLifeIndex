@extends('welcome')
@section('content')

<div class="flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-7xl w-full">
        <h2 class="text-lg font-semibold mb-4">Người dùng thân mếm,</h2>
        <p class="mb-4">
            Cảm ơn bạn đã tham gia đánh giá chất lượng chỉ số cuộc sống để chung tôi biết và cải thiện đời sống chung của người dân.
            để đánh giá về ...
        </p>
        <p class="font-semibold mb-4">Vui lòng đánh giá mức độ ... của bạn theo các thông số sau</p>
        <form>
            @foreach ($questions as $index => $question)
            <div class="mb-4">
                <label class="block mb-2">{{ $question->title }}</label>
                <div class="flex justify-between items-center mb-2">
                    <span>TỆ</span>
                    <span>TỐT</span>
                </div>
                <div class="w-full p-4">
                    <input type="range" min="0" max="10" step="0.1" value="0" class="w-full cursor-pointer slider" id="slider-{{ $index }}">
                    <label for="slider-{{ $index }}" class="block text-center mt-2">Giá trị: <span class="slider-value">0.0</span></label>
                </div>
            </div>
            @endforeach
            <button type="submit" class="text-blue-500 p-2 rounded w-full">Gửi đánh giá của bạn</button>
        </form>
    </div>
</div>
<script>
    // Script để cập nhật giá trị khi kéo thanh slider
    document.querySelectorAll('.slider').forEach(slider => {
        slider.addEventListener('input', function() {
            this.nextElementSibling.querySelector('.slider-value').textContent = this.value;
        });
    });
</script>
@endsection
