@extends('dashboard.layout')
@section('content')
    <div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
        <div
            class="relative flex flex-col w-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
            <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl ">
                <h6 class="text-lg font-semibold text-white">Bảng thống kê chỉ số mặc định</h6>
                <!-- Import Excel Form -->
                <form action="{{ route('import.excel') }}" method="POST" enctype="multipart/form-data"
                    class="flex items-center">
                    @csrf
                    <div class="flex items-center p-2">
                        <input type="file" name="excel_file"
                            class="form-control rounded-lg border border-gray-300 text-sm" required>
                        <button type="submit"
                            class="ml-4 text-blue-600 font-bold py-2 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-100">
                            Tải lên
                        </button>
                        <a href="{{ asset('assets/mau_upload.xlsx') }}"
                            class="ml-4 text-blue-600 font-bold py-2 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-100">
                            Tải file mẫu
                        </a>
                    </div>
                </form>
                <!-- Download Sample File Button -->

            </div>

            <div class="p-6 pb-0 mb-0 bg-slate-200 rounded-t-2xl flex flex-col lg:flex-row justify-between items-center">
                <form action="{{ route('dashboard.indicator-value-admin') }}" method="GET"
                    class="flex flex-col lg:flex-row items-center w-full">
                    <div class="flex flex-col lg:flex-row items-center w-full lg:w-auto mb-2 lg:mb-0 mr-2">
                        <label for="per_page" class="mr-2 text-sm font-medium text-slate-700">Số dòng hiển thị:</label>
                        <select name="per_page" id="per_page"
                            class="form-select px-2 py-2 rounded-lg border border-gray-300 text-sm w-full lg:w-auto"
                            onchange="this.form.submit()">
                            <option value="5" {{ request('per_page') == 5 ? 'selected' : '' }}>5</option>
                            <option value="10" {{ request('per_page') == 10 ? 'selected' : '' }}>10</option>
                            <option value="15" {{ request('per_page') == 15 ? 'selected' : '' }}>15</option>
                            <option value="20" {{ request('per_page') == 20 ? 'selected' : '' }}>20</option>
                        </select>
                    </div>
                    <div class="flex flex-col lg:flex-row items-center w-full lg:w-auto mb-2 lg:mb-0 mr-2">
                        <label for="indicators" class="ml-0 lg:ml-4 mr-2 text-sm font-medium text-slate-700">Loại chỉ
                            số:</label>
                        <select name="indicators" id="indicators"
                            class="form-select px-2 py-2 rounded-lg border border-gray-300 text-sm w-full lg:w-auto">
                            <option value="">Tất cả</option>
                            @foreach ($indicators as $indicator)
                                <option value="{{ $indicator->id }}"
                                    {{ request('indicators') == $indicator->id ? 'selected' : '' }}>
                                    {{ $indicator->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="flex flex-col lg:flex-row items-center w-full lg:w-auto mb-2 lg:mb-0 mr-2">
                        <label for="districts" class="ml-0 lg:ml-4 mr-2 text-sm font-medium text-slate-700">Huyện:</label>
                        <select name="districts" id="districts"
                            class="form-select px-2 py-2 rounded-lg border border-gray-300 text-sm w-full lg:w-auto">
                            <option value="">Tất cả</option>
                            @foreach ($districts as $district)
                                <option value="{{ $district->id }}"
                                    {{ request('districts') == $district->id ? 'selected' : '' }}>
                                    {{ $district->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <button type="submit" class="mt-2 text-blue-600 font-bold py-2 rounded-lg mr-2">
                        Lọc
                    </button>
                    <a href="/indicator-value-admin" class="mt-2 text-yellow-600 font-bold py-2 rounded-lg"><i
                            class="fa-solid fa-rotate-right"></i></a>
                </form>
            </div>


            <div class="flex-auto px-0 pt-0 pb-2">
                <div class="p-0 overflow-x-auto">
                    <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                        <thead class="align-bottom">
                            <tr>
                                <th
                                    class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Tên chỉ số</th>
                                <th
                                    class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Huyện</th>
                                <th
                                    class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Điểm trung bình</th>
                                <th
                                    class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($results as $row)
                                <tr>
                                    <td
                                        class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <div class="flex px-2 py-1">
                                            <div class="flex flex-col justify-center">
                                                <h6 class="mb-0 leading-normal text-sm">{{ $row->indicator_name }}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <p class="mb-0 font-semibold leading-tight text-xs"> {{ $row->district_name }}</p>
                                    </td>
                                    <td
                                        class="p-2 text-center align-middle bg-transparent border-b shadow-transparent break-words whitespace-normal max-w-xs">
                                        <span
                                            class="font-semibold leading-tight text-xs text-slate-400">{{ $row->average_value ?? 'Không có dữ liệu' }}</span>
                                    </td>
                                    <td
                                        class="p-2 text-center align-middle bg-transparent border-b shadow-transparent break-words whitespace-normal max-w-xs">
                                        <a href="{{ route('indicators.details.district', ['id' => $row->indicator_id, 'district_id' => $row->districts_id]) }}"
                                            class="px-2 py-2 text-blue-500 rounded-lg font-bold">Chi tiết</a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                    <!-- Pagination Links -->
                    <nav class="mx-2 my-2 text-center">
                        <div>
                            Trang {{ $results->currentPage() }} / {{ $results->lastPage() }} -
                            Đang hiển thị {{ $results->firstItem() }} tới {{ $results->lastItem() }} trong
                            {{ $results->total() }} kết quả
                        </div>
                        <ul class="inline-flex -space-x-px text-base h-10">
                            {!! $results->appends([
                                    'per_page' => request('per_page'),
                                    'name' => request('name'),
                                    'date' => request('date'),
                                    'question_code' => request('question_code'),
                                ])->links('vendor.pagination.pagination-custom') !!}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
@endsection
