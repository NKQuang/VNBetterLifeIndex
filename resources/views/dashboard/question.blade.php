@extends('dashboard.layout')

@section('content')
<div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
    <div class="relative flex flex-col w-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
        <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl flex justify-between items-center">
            <h6 class="text-lg font-semibold text-white">{{ $title }}</h6>
            <a href="{{ route('questions.create') }}" class="font-semibold leading-tight text-xs text-white bg-green-500 px-3 py-2 rounded">Tạo mới</a>
        </div>

        <div class="flex-auto px-0 pt-0 pb-2">
            <div class="p-0 overflow-x-auto">
                <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead class="align-bottom">
                        <tr>
                            <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">#ID</th>
                            <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Tiêu đề</th>
                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Mã câu hỏi</th>
                            <th class="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($questions as $question)
                        <tr>
                            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <div class="flex px-2 py-1">
                                    <div class="flex flex-col justify-center">
                                        <h6 class="mb-0 leading-normal text-sm">{{ $question->id }}</h6>
                                    </div>
                                </div>
                            </td>
                            <td class="p-2 align-middle bg-transparent border-b shadow-transparent">
                                <p class="mb-0 font-semibold leading-tight text-xs break-words whitespace-normal max-w-xs">
                                    <i class="fa-solid fa-bullseye"></i> {{ $question->title }}
                                </p>
                            </td>


                            <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <span class="font-semibold leading-tight text-xs text-slate-400">{{ $question->question_code }}</span>
                            </td>
                            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <form action="{{ route('questions.destroy', $question->id) }}" method="POST" style="display:inline;">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="font-semibold leading-tight text-xs text-red-400"  onclick="return confirm('Bạn có chắc chắn muốn xóa?')">Xóa</button>
                                </form>
                                <a href="{{ route('questions.edit', $question->id) }}" class="font-semibold leading-tight text-xs text-green-400">Cập nhật</a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                <!-- Pagination Links -->
                <div class="mt-4 p-2">
                    {{ $questions->links('vendor.pagination.tailwind') }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
