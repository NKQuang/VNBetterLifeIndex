@extends('dashboard.layout')
@section('content')

<div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
    <div class="relative flex flex-col w-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
        <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl flex justify-between items-center">
            <h6 class="text-lg font-semibold text-white">{{ $title }}</h6>
        </div>
        <div class="flex-auto px-0 pt-0 pb-2">
            <form action="{{ route('indicators.store') }}" method="POST">
                @csrf
                <div class="px-6 py-4">
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">Tên</label>
                        <input type="text" name="name" id="name" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required>
                    </div>

                    <div class="mb-4">
                        <label for="descriptions" class="block text-sm font-medium text-gray-700">Ghi chú</label>
                        <input type="text" name="descriptions" id="descriptions" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
                    <div class="flex justify-end">
                        <button type="submit" class="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-300">Thêm mới</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
