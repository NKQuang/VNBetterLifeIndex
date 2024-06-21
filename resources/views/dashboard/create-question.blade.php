@extends('dashboard.layout')

@section('content')
<div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
    <div class="relative flex flex-col w-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
        <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl flex justify-between items-center">
            <h6 class="text-lg font-semibold text-white">{{ $title }}</h6>
        </div>

        <div class="flex-auto px-0 pt-0 pb-2">
            <div class="p-6">
                <form action="{{ route('questions.store') }}" method="POST">
                    @csrf
                    <div class="mb-4">
                        <label class="block text-gray-700">Tiêu đề</label>
                        <input type="text" name="title" class="w-full px-4 py-2 border rounded-lg" value="{{ old('title') }}" required>
                        @error('title')
                            <div class="text-red-500">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Nội dung</label>
                        <textarea name="content" class="w-full px-4 py-2 border rounded-lg" required>{{ old('content') }}</textarea>
                        @error('content')
                            <div class="text-red-500">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Mã câu hỏi</label>
                        <input type="text" name="question_code" class="w-full px-4 py-2 border rounded-lg" value="{{ old('question_code') }}" required>
                        @error('question_code')
                            <div class="text-red-500">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Chỉ số</label>
                        <select name="indicator_id" class="w-full px-4 py-2 border rounded-lg" required>
                            <option value="">Chọn chỉ số</option>
                            @foreach($indicators as $indicator)
                                <option value="{{ $indicator->id }}" {{ old('indicator_id') == $indicator->id ? 'selected' : '' }}>{{ $indicator->name }}</option>
                            @endforeach
                        </select>
                        @error('indicator_id')
                            <div class="text-red-500">{{ $message }}</div>
                        @enderror
                    </div>
                    <button type="submit" class="text-blue-500 font-bold py-2 px-4 rounded">Lưu</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
