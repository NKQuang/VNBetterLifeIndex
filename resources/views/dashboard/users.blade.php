@extends('dashboard.layout')
@section('content')
    <div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
        <div
            class="relative flex flex-col w-full min-w-0  break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
            <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl">
                <h6>Bảng thống kế người dùng</h6>
                <a href="#" onclick="togglePopup()" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <i class="fa-solid fa-download"></i> Xuất dữ liệu excel
                </a>
            </div>
            <div class="flex-auto px-0 pt-0 pb-2">
                <div class="p-0 overflow-x-auto">
                    <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                        <thead class="align-bottom">
                            <tr>
                                <th
                                    class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Người dùng</th>
                                <th
                                    class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Liên hệ</th>
                                <th
                                    class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Giới tính</th>
                                <th
                                    class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Loại người dùng</th>
                                <th
                                    class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Tình trạng hôn nhân</th>
                                <th
                                    class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Nghề nghiệp</th>
                                <th
                                    class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Nhóm độ tuổi</th>

                                <th
                                    class="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($user as $row)
                                <tr>
                                    <td
                                        class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <div class="flex px-2 py-1">
                                            <div class="flex flex-col justify-center">
                                                <h6 class="mb-0 leading-normal text-sm">{{ $row->name }}</h6>
                                                <p class="mb-0 leading-tight text-xs text-slate-400">{{ $row->email }}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <p class="mb-0 font-semibold leading-tight text-xs"><i
                                                class="fa-solid fa-phone"></i> {{ $row->phone }}</p>
                                        <p class="mb-0 leading-tight text-xs text-slate-400"><i
                                                class="fa-solid fa-location-dot"></i>
                                            {{ $row->address ? $row->address : ' N/A' }}</p>
                                    </td>
                                    <td
                                        class="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                                        <span
                                            class="bg-gradient-to-tl from-green-600 to-lime-400 px-2 text-xxs rounded py-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">{{ $row->gender == 0 ? 'Nam' : 'Nữ' }}</span>
                                    </td>
                                    <td
                                        class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <span
                                            class="font-semibold leading-tight text-xs text-slate-400">{{ $row->role }}</span>
                                    </td>
                                    <td
                                        class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <span
                                            class="font-semibold leading-tight text-xs text-slate-400">{{ $row->marital_status ? $row->marital_status : 'N/A' }}</span>
                                    </td>
                                    <td
                                        class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <span
                                            class="font-semibold leading-tight text-xs text-slate-400">{{ $row->profession ? $row->profession : 'N/A' }}</span>
                                    </td>
                                    <td
                                        class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <span
                                            class="font-semibold leading-tight text-xs text-slate-400">{{ $row->old ? $row->old : 'N/A' }}</span>
                                    </td>
                                    <td
                                        class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        @if ($row->status != 99)
                                            <a href="{{ route('user.edit', $row->id) }}"
                                                class="font-semibold leading-tight text-xs text-blue-400"> <i
                                                    class="fa-solid fa-pencil-alt"></i> </a>|
                                            @if ($row->status == 0)
                                                <a href="{{ route('user.blockUser', $row->id) }}"
                                                    class="font-semibold leading-tight text-xs text-red-400"> <i
                                                        class="fa-solid fa-lock"></i> </a>
                                            @else
                                                <a href="{{ route('user.blockUser', $row->id) }}"
                                                    class="font-semibold leading-tight text-xs text-green-400"> <i
                                                        class="fa-solid fa-unlock"></i> </a>
                                            @endif
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- Popup -->
    <div id="popup" class="fixed inset-0 flex items-center justify-center border-spacing-3 hidden">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 class="text-xl font-semibold mb-4 text-center">Hãy chọn kiểu dữ liệu bạn muốn xuất</h2>
            <div class="flex justify-center" id="popup-buttons">
                <button onclick="togglePopup()" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2">Hủy</button>
                <button onclick="showForm()" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2">Tùy
                    chọn xuất dữ liệu</button>
                <form action="/users/export" method="POST" class="inline">
                    @csrf
                    <button type="submit" class="px-4 py-2 bg-gray-300 text-blue-500 rounded hover:bg-gray-400 mr-2">Xuất
                        tất cả</button>
                </form>
            </div>
            <div id="export-form" class="hidden mt-4">
                <form action="/users/export" method="POST" class="space-y-4">
                    @csrf
                    <div>
                        <label class="block text-gray-700">Giới Tính</label>
                        <select name="gender" class="w-full border border-gray-300 rounded p-2">
                            <option value="">Tất cả</option>
                            <option value="0">Nam</option>
                            <option value="1">Nữ</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700">Loại Người Dùng</label>
                        <select name="user_type" class="w-full border border-gray-300 rounded p-2">
                            <option value="">Tất cả</option>
                            <option value="admin">Admin</option>
                            <option value="user">Member</option>
                            <option value="anonymous">Ẩn danh</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700">Tình Trạng Hôn Nhân</label>
                        <select name="marital_status" class="w-full border border-gray-300 rounded p-2">
                            <option value="">Tất cả</option>
                            <option value="Độc thân/Đã ly hôn">Độc thân/Đã ly hôn</option>
                            <option value="Đã kết hôn">Đã kết hôn</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700">Nghề Nghiệp</label>
                        <select name="profession" class="w-full border border-gray-300 rounded p-2">
                            <option value="">Tất cả</option>
                            <option value="Học sinh/Sinh viên">Học sinh/Sinh viên</option>
                            <option value="Nhân viên/Người lao động">Nhân viên/Người lao động</option>
                            <option value="Quản lý/Giám đốc">Quản lý/Giám đốc</option>
                            <option value="Chủ doanh nghiệp">Chủ doanh nghiệp</option>
                            <option value="Đã nghỉ hưu">Đã nghỉ hưu</option>
                            <option value="Thất nghiệp">Thất nghiệp</option>
                            <option value="Khác">Khác</option>
                        </select>

                    </div>
                    <div>
                        <label class="block text-gray-700">Độ tuổi</label>
                        <select name="old" class="w-full border border-gray-300 rounded p-2">
                            <option value="">Tất cả</option>
                            <option value="0-15">0-15</option>
                            <option value="15-25">15-25</option>
                            <option value="25-35">25-35</option>
                            <option value="35-45">35-45</option>
                            <option value="45-55">45-55</option>
                            <option value="55-65">55-65</option>
                            <option value=">65">>65</option>
                        </select>
                    </div>
                    <div class="flex justify-end">
                        <button type="button" onclick="hideForm()"
                            class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Quay lại</button>
                        <button type="submit" class="px-4 py-2 bg-gray-300 text-blue-600 rounded hover:bg-gray-400">Xuất
                            dữ liệu</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script>
        function togglePopup() {
            var popup = document.getElementById('popup');
            popup.classList.toggle('hidden');
        }

        function showForm() {
            var buttons = document.getElementById('popup-buttons');
            var form = document.getElementById('export-form');
            buttons.classList.add('hidden');
            form.classList.remove('hidden');
        }

        function hideForm() {
            var buttons = document.getElementById('popup-buttons');
            var form = document.getElementById('export-form');
            form.classList.add('hidden');
            buttons.classList.remove('hidden');
        }
    </script>
@endsection
