@extends("dashboard.layout")
@section("content")

<div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
    <div class="relative flex flex-col w-full min-w-0  break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
        <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl flex justify-between items-center">
            <h6 class="text-lg font-semibold text-white">Bảng thống kê chỉ số</h6>
            <!-- Import Excel Form -->
            <form action="{{ route('import.excel') }}" method="POST" enctype="multipart/form-data" class="flex items-center">
                @csrf
                <div class="flex items-center p-2">
                    <input type="file" name="excel_file" class="form-control rounded-lg border border-gray-300 text-sm" required>
                    <button type="submit" class="ml-2 text-blue-600 font-bold py-2 px-4 rounded-lg">
                        Tải lên
                    </button>
                </div>
            </form>
        </div>



        <div class="flex-auto px-0 pt-0 pb-2">
            <div class="p-0 overflow-x-auto">
                <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead class="align-bottom">
                        <tr>
                            <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Tên</th>
                            <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Điểm đánh giá</th>

                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Câu hỏi?</th>
                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Ngày đánh giá</th>
                            {{-- <th class="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th> --}}
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($indicators_value as $row)
                        <tr>
                            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <div class="flex px-2 py-1">
                                    <div class="flex flex-col justify-center">
                                        <h6 class="mb-0 leading-normal text-sm">{{ $row->name }}</h6>
                                    </div>
                                </div>
                            </td>
                            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <p class="mb-0 font-semibold leading-tight text-xs"><i class="fa-solid fa-bullseye"></i> {{ $row->value }}</p>
                            </td>
                            <td class="p-2 text-center align-middle bg-transparent border-b shadow-transparent  break-words whitespace-normal ">
                                <span class="font-semibold leading-tight text-xs text-slate-400 "> {{ $row->question->title ?? 'N/A' }}</span>
                            </td>

                            <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent" >
                                <span class="font-semibold leading-tight text-xs text-slate-400">{{date('d/m/Y', strtotime($row->created_at))}}</span>
                            </td>
                            {{-- <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <form action="{{ route('dashboard.indicator-values.delete', $row->id) }}" method="POST" class="inline-block">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="font-semibold leading-tight text-xs text-red-400" onclick="return confirm('Bạn có chắc chắn muốn xóa?')"> Xóa </button>
                                </form>
                                <a href="{{ route('dashboard.indicator-values.edit', $row->id) }}" class="font-semibold leading-tight text-xs text-green-400"> Sửa </a>
                            </td> --}}
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                 <!-- Pagination Links -->
                 <div class="mt-4 p-2">
                    {{ $indicators_value->appends(request()->input())->links('vendor.pagination.tailwind') }}
                </div>

            </div>
        </div>
    </div>
</div>
@endsection
