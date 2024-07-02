@extends("dashboard.layout")
@section("content")

<div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
    <div class="relative flex flex-col w-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
        <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl">
            <h6 class="text-lg font-semibold text-white">Bảng thống kê chỉ số của người dùng đánh giá</h6>
            <form action="{{ route('import.excel') }}" method="POST" enctype="multipart/form-data" class="flex items-center">
                @csrf
                <div class="flex items-center p-2">
                    <button type="submit" class=" text-blue-600 font-bold py-2 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-100">
                        Xuất Excel
                    </button>
                    <a onclick="openModal()" class="ml-4 text-blue-600 font-bold py-2 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-100">
                        Xóa dữ liệu
                    </a>
                </div>
            </form>
        </div>

        <div class="p-6 pb-0 mb-0 bg-slate-200 rounded-t-2xl flex flex-col lg:flex-row justify-between items-center">
            <form action="{{ route('dashboard.indicator-values') }}" method="GET" class="flex flex-col lg:flex-row items-center w-full">
                <div class="flex flex-col lg:flex-row items-center w-full lg:w-auto mb-2 lg:mb-0 mr-2">
                    <label for="per_page" class="mr-2 text-sm font-medium text-slate-700">Số dòng hiển thị:</label>
                    <select name="per_page" id="per_page" class="form-select px-2 py-2 rounded-lg border border-gray-300 text-sm w-full lg:w-auto" onchange="this.form.submit()">
                        <option value="5" {{ request('per_page') == 5 ? 'selected' : '' }}>5</option>
                        <option value="10" {{ request('per_page') == 10 ? 'selected' : '' }}>10</option>
                        <option value="15" {{ request('per_page') == 15 ? 'selected' : '' }}>15</option>
                        <option value="20" {{ request('per_page') == 20 ? 'selected' : '' }}>20</option>
                    </select>
                </div>
                <div class="flex flex-col lg:flex-row items-center w-full lg:w-auto mb-2 lg:mb-0 mr-2">
                    <label for="date" class="ml-0 lg:ml-4 mr-2 text-sm font-medium text-slate-700">Ngày:</label>
                    <input type="date" name="date" id="date" value="{{ request('date') }}" class="form-control rounded-lg border border-gray-300 text-sm w-full lg:w-auto">
                </div>

                <div class="flex flex-col lg:flex-row items-center w-full lg:w-auto mb-2 lg:mb-0 mr-2">
                    <label for="indicators" class="ml-0 lg:ml-4 mr-2 text-sm font-medium text-slate-700">Loại chỉ số:</label>
                    <select name="indicators" id="indicators" class="form-select px-2 py-2 rounded-lg border border-gray-300 text-sm w-full lg:w-auto">
                        <option value="">Tất cả</option>
                        @foreach ($indicators as $indicator)
                            <option value="{{ $indicator->id }}" {{ request('indicators') == $indicator->id ? 'selected' : '' }}>
                                {{ $indicator->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div class="flex flex-col lg:flex-row items-center w-full lg:w-auto mb-2 lg:mb-0 mr-2">
                    <label for="districts" class="ml-0 lg:ml-4 mr-2 text-sm font-medium text-slate-700">Huyện:</label>
                    <select name="districts" id="districts" class="form-select px-2 py-2 rounded-lg border border-gray-300 text-sm w-full lg:w-auto">
                        <option value="">Tất cả</option>
                        @foreach ($districts as $district)
                            <option value="{{ $district->id }}" {{ request('districts') == $district->id ? 'selected' : '' }}>
                                {{ $district->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <button type="submit" class="mt-2 text-blue-600 font-bold py-2 rounded-lg mr-2">
                    Lọc
                </button>
                <a href="/indicator-values" class="mt-2 text-yellow-600 font-bold py-2 rounded-lg">Reset</a>
            </form>
        </div>


        <div class="flex-auto px-0 pt-0 pb-2">
            <div class="p-0 overflow-x-auto">
                <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead class="align-bottom">
                        <tr>
                            <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Tên</th>
                            <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Điểm đánh giá</th>
                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Huyện</th>

                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Câu hỏi?</th>
                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Người đánh giá</th>

                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Ngày đánh giá</th>
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
                            <td class="p-2 text-center align-middle bg-transparent border-b shadow-transparent break-words whitespace-normal max-w-xs">
                                <span class="font-semibold leading-tight text-xs text-slate-400">{{ $row->district->name ?? 'N/A' }}</span>
                            </td>
                            <td class="p-2 text-left align-middle bg-transparent border-b shadow-transparent break-words whitespace-normal max-w-xs">
                                <span class="font-semibold leading-tight text-xs text-slate-400">{{ $row->question->title ?? 'N/A' }}</span>
                            </td>
                            <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <span class="font-semibold leading-tight text-xs text-slate-400">{{ $row->user->name ?? 'N/A' }}</span>
                            </td>
                            <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <span class="font-semibold leading-tight text-xs text-slate-400">{{ date('d/m/Y', strtotime($row->created_at)) }}</span>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>

                <!-- Pagination Links -->
                <nav class="mx-2 my-2 text-center">
                    <div>
                        Trang {{ $indicators_value->currentPage() }} / {{ $indicators_value->lastPage() }} -
                        Đang hiển thị {{ $indicators_value->firstItem() }} tới {{ $indicators_value->lastItem() }} trong {{ $indicators_value->total() }} kết quả
                    </div>
                    <ul class="inline-flex -space-x-px text-base h-10">
                        {!! $indicators_value->appends(['per_page' => request('per_page'), 'name' => request('name'), 'date' => request('date'), 'question_code' => request('question_code')])->links('vendor.pagination.pagination-custom') !!}
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->
<div id="confirmationModal" class="fixed inset-0 flex items-center justify-center hidden">
    <div class="bg-white rounded-lg shadow-lg w-1/3">
        <div class="p-6 text-center">
            <h2 class="text-lg font-semibold mb-4">Xác nhận xóa dữ liệu</h2>
            <p class="mb-4">Bạn có chắc chắn muốn xóa dữ liệu không?</p>
            <div class="flex justify-center">
                <button onclick="closeModal()" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
                    Hủy
                </button>
                <a href="{{ route('delete.indicators', ['type' => 0]) }}" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Xóa
                </a>
            </div>
        </div>
    </div>
</div>
<script>
     function openModal() {
        document.getElementById('confirmationModal').classList.remove('hidden');
    }

    function closeModal() {
        document.getElementById('confirmationModal').classList.add('hidden');
    }
</script>
@endsection
