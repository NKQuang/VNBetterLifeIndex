<!-- resources/views/dashboard/indicator-details.blade.php -->

@extends('dashboard.layout')

@section('content')
<div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
    <div class="relative flex flex-col w-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
        <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl flex justify-between items-center">

            <h6 class="text-lg font-semibold text-white"><a href="{{ url()->previous() }}" class="text-white"><i class="fa-solid fa-arrow-left"></i></a> Chi tiết chỉ số mặc định: {{ $indicator->name }} của {{ $districts[0]->full_name}}</h6>
        </div>
        {{-- <div class="p-6 pb-0 mb-0 bg-slate-200 rounded-t-2xl flex flex-col lg:flex-row justify-between items-center">
            <form action="{{ route('indicators.details', ['id' => $indicator->id]) }}" method="GET" class="flex flex-col lg:flex-row items-center w-full">
                <div class=" lg:w-auto mb-2 lg:mb-0 mr-2">
                    <label for="per_page" class="mr-2 text-sm font-medium text-slate-700">Số dòng hiển thị:</label>
                    <select name="per_page" id="per_page" class="form-select px-2 py-2 rounded-lg border border-gray-300 text-sm w-full lg:w-auto" onchange="this.form.submit()">
                        <option value="5" {{ request('per_page') == 5 ? 'selected' : '' }}>5</option>
                        <option value="10" {{ request('per_page') == 10 ? 'selected' : '' }}>10</option>
                        <option value="15" {{ request('per_page') == 15 ? 'selected' : '' }}>15</option>
                        <option value="20" {{ request('per_page') == 20 ? 'selected' : '' }}>20</option>
                    </select>
                </div>
            </form>
        </div> --}}
        <div class="flex-auto px-0 pt-0 pb-2">
            <div class="p-6 overflow-x-auto">
                <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead>
                        <tr>
                            <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs tracking-none whitespace-nowrap text-slate-400 opacity-70">Tên huyện</th>
                            <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs tracking-none whitespace-nowrap text-slate-400 opacity-70">Điểm đánh giá</th>
                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs tracking-none whitespace-nowrap text-slate-400 opacity-70">Ngày tải lên</th>
                            <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs tracking-none whitespace-nowrap text-slate-400 opacity-70">Câu hỏi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($indicatorValues as $value)
                        <tr>
                            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                {{ $districts->firstWhere('id', $value->districts_id)->name }}
                            </td>
                            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                {{ $value->value }}
                            </td>
                            <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                {{ date('d/m/Y', strtotime($value->created_at)) }}
                            </td>
                            <td class="p-2 text-left align-middle bg-transparent border-b shadow-transparent break-words whitespace-normal max-w-xs">
                                {{ $questions->firstWhere('question_code', $value->question_code)->title ?? 'N/A' }}
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                {{-- <nav class="mx-2 my-2 text-center">
                    <div>
                        Trang {{ $indicatorValues->currentPage() }} / {{ $indicatorValues->lastPage() }} -
                        Đang hiển thị {{ $indicatorValues->firstItem() }} tới {{ $indicatorValues->lastItem() }} trong {{ $indicatorValues->total() }} kết quả
                    </div>
                    <ul class="inline-flex -space-x-px text-base h-10">
                        {!! $indicatorValues->appends(['per_page' => request('per_page'), 'name' => request('name'), 'date' => request('date'), 'question_code' => request('question_code')])->links('vendor.pagination.pagination-custom') !!}
                    </ul>
                </nav> --}}
            </div>
        </div>
    </div>
</div>
@endsection
