<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Lịch sử đánh giá') }}
        </h2>
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <h3 class="text-lg font-semibold mb-4">Danh sách đánh giá của người dùng</h3>
                    <div class="space-y-4">
                        @foreach ($ratelist as $row)
                        <div class="bg-gray-50 p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div class="flex flex-col sm:flex-row sm:items-center">
                                <div class="text-gray-800 font-semibold max-w-screen-sm">{{ optional($row->question)->title }} <br>
                                    <span class="text-gray-600 text-xs">Đánh giá cho: {{ optional($row->district)->full_name }} / Tỉnh Bà Rịa - Vũng Tàu</span>
                                    <br>
                                    <span class="text-gray-600 text-xs">Đánh giá ngày: {{ date('d/m/Y', strtotime($row->created_at )) }}</span>
                                </div>


                            </div>
                            <div class="flex items-center mt-2 sm:mt-0">
                                <div class="text-yellow-500 font-semibold">{{ $row->value }}</div>
                                <a  class="ml-4 text-indigo-600 hover:text-indigo-900" onclick="toggleEditForm({{ $row->id }})">Chỉnh sữa</a>
                            </div>
                        </div>
                        <div id="edit-form-{{ $row->id }}" class="hidden mt-4">
                            <form method="POST" action="{{ route('reviews.update', $row->id) }}">
                                @csrf
                                @method('PUT')
                                <div class="mb-4">
                                    <label for="question" class="block text-sm font-medium text-gray-700">Câu hỏi</label>
                                    <p class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">{{ $row->question->title }}</p>
                                </div>
                                <div class="mb-4">
                                    <label for="value" class="block text-sm font-medium text-gray-700">Đánh giá</label>
                                    <input type="range" name="value" id="value" min="0" max="10" value="{{ $row->value }}" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md slider" oninput="updateSliderValue(this)">
                                    <div class="flex justify-between text-xs text-gray-500">
                                        <span>0</span>
                                        <span>1</span>
                                        <span>2</span>
                                        <span>3</span>
                                        <span>4</span>
                                        <span>5</span>
                                        <span>6</span>
                                        <span>7</span>
                                        <span>8</span>
                                        <span>9</span>
                                        <span>10</span>
                                    </div>
                                    <div id="slider-value" class="text-center text-red-500 mt-2">{{ $row->value }}/10</div>
                                </div>
                                <div class="flex items-center justify-end">
                                    <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Cập nhật
                                    </button>
                                    <button type="button" class="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onclick="toggleEditForm({{ $row->id }})">
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        function toggleEditForm(reviewId) {
            const editForm = document.getElementById(`edit-form-${reviewId}`);
            if (editForm.classList.contains('hidden')) {
                editForm.classList.remove('hidden');
            } else {
                editForm.classList.add('hidden');
            }
        }
    </script>
</x-app-layout>
