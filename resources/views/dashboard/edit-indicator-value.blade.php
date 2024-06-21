@extends("dashboard.layout")
@section("content")

<div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
    <div class="relative flex flex-col w-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
        <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl flex justify-between items-center">
            <h6 class="text-lg font-semibold text-white">Chỉnh sửa chỉ số</h6>
        </div>
        <div class="flex-auto px-0 pt-0 pb-2">
            <div class="p-6 bg-white rounded-t-2xl">
                <form action="{{ route('dashboard.indicator-values.update', $indicatorValue->id) }}" method="POST" class="flex flex-col space-y-4">
                    @csrf
                    @method('PUT')
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-700">Tên:</label>
                        <input type="text" name="name" id="name" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="{{ old('name', $indicatorValue->name) }}" required>
                    </div>
                    <div class="flex flex-col">
                        <label for="value" class="text-sm font-medium text-gray-700">Điểm đánh giá:</label>
                        <input type="number" name="value" id="value" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="{{ old('value', $indicatorValue->value) }}" step="0.00000000000000001" min="0" max="10" required>
                    </div>


                    <div class="flex flex-col">
                        <label for="question" class="text-sm font-medium text-gray-700">Câu hỏi:</label>
                        <textarea type="text" name="question" id="question" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="{{ old('type', $indicatorValue->question) }}"></textarea>
                    </div>
                    <div class="flex flex-col">
                        <label for="created_at" class="text-sm font-medium text-gray-700">Ngày đánh giá:</label>
                        <input type="date" name="created_at" id="created_at" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value="{{ old('created_at', $indicatorValue->created_at->format('Y-m-d')) }}" required>
                    </div>
                    <div class="flex items-end justify-between">
                        <button type="submit" class=" text-blue-500 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                            Cập nhật
                        </button>
                        <a href="{{ route('dashboard.indicator-values') }}" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                            Hủy bỏ
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
