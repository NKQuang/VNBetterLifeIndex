@extends('dashboard.layout')
@section('content')
    <div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
        <div
            class="relative flex flex-col w-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
            <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl flex justify-between items-center">
                <h6 class="text-lg font-semibold text-white">{{ $title }}</h6>
            </div>
            <div class="flex-auto px-0 pt-0 pb-2">
                <form action="{{ route('districts.update', $district->id) }}" method="POST">
                    @csrf
                    @method('PUT')
                    <div class="px-6 py-4">
                        <div class="mb-4">
                            <label for="name" class="block text-sm font-medium text-gray-700">Tên</label>
                            <input type="text" name="name" id="name" value="{{ $district->name }}"
                                class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required>
                        </div>
                        <div class="mb-4">
                            <label for="full_name" class="block text-sm font-medium text-gray-700">Tên huyện</label>
                            <input type="text" name="full_name" id="full_name" value="{{ $district->full_name }}"
                                class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required>
                        </div>
                        <div class="mb-4">
                            <label for="full_name_en" class="block text-sm font-medium text-gray-700">Tên quốc tế</label>
                            <input type="text" name="full_name_en" id="full_name_en"
                                value="{{ $district->full_name_en }}"
                                class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        </div>
                        <div class="mb-4">
                            <label for="full_name_en" class="block text-sm font-medium text-gray-700">Thông tin thêm</label>
                            <textarea rows="5" type="text" name="content" id="content"
                                class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">{{ $district->content }}</textarea>
                        </div>

                        <div class="flex justify-end">
                            <button type="submit"
                                class="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-300">Cập
                                nhật</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
