@extends('dashboard.layout')
@section('content')
    <section class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Users Count -->
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-fuchsia-500">{{ $usersCount }}</span>
                        <h3 class="text-base font-normal text-gray-600 uppercase">Người dùng</h3>
                    </div>
                    <div class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                        <i class="fa-2x fa-solid fa-users"></i>
                    </div>
                </div>
            </div>

            <!-- Posts Count -->
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-purple-500">{{ $indicators }}</span>
                        <h3 class="text-base font-normal text-gray-600 uppercase">Số lượng chỉ số</h3>
                    </div>
                    <div class="ml-5 w-0 flex items-center justify-end flex-1 text-blue-500 text-base font-bold">
                        <i class="fa-2x fa-solid fa-newspaper"></i>
                    </div>
                </div>
            </div>

            <!-- Today's Posts Count -->
            <!-- Similar to Users Count -->
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span
                            class="text-2xl sm:text-3xl leading-none font-bold text-indigo-500">{{ $indicatorValue }}</span>
                        <h3 class="text-base font-normal text-gray-600 uppercase">Lượt đánh giá</h3>
                    </div>
                    <div class="ml-5 w-0 flex items-center justify-end flex-1 text-purple-500 text-base font-bold">
                        <i class="fa-2x fa-solid fa-list"></i>
                    </div>
                </div>
            </div>

            <!-- Other Stats -->
            <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span class="text-2xl sm:text-3xl leading-none font-bold text-cyan-500">{{ $indicators }}</span>
                        <h3 class="text-base font-normal text-gray-600 uppercase">Chỉ số</h3>
                    </div>
                    <div class="ml-5 w-0 flex items-center justify-end flex-1 text-blue-500 text-base font-bold">
                        <i class="fa-2x fa-solid fa-star"></i>
                    </div>
                </div>
            </div>
        </div>

        {{-- <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <!-- Users Chart -->
        <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <h3 class="mb-4 text-xl font-semibold text-gray-900 uppercase">Lượng người dùng đăng ký</h3>
            <canvas id="usersChart"></canvas>
        </div>

         <!-- Bar Chart -->
     <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <h3 class="mb-4 text-xl font-semibold text-gray-900 uppercase">Chủ đề & số lượng bài viết</h3>
                <canvas id="barChart"></canvas>
            </div>
    </div> --}}

    <div class="w-full mt-2 loopple-min-height-78vh text-slate-500">
        <div class="relative flex flex-col w-full min-w-0  break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
            <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl flex items-center space-x-4">
                <h6>Thông tin về WBI</h6>
                <div class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 mx-2 my-2" id="pagination"></div>
            </div>
            <div class="flex-auto px-0 pt-0 pb-2">
                <div class="p-0 overflow-x-auto">
                    <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                        <thead class="align-bottom">
                            <tr>
                                <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Huyện/Thị Xã</th>
                                <th class="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Giá trị WBI</th>
                                <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Chỉ số
                                    <span>
                                        <br/>
                                        2/3 avg(chỉ số mặc định) + 1/3 avg(chỉ số người đánh giá)
                                    </span>
                                </th>
                                <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Chỉ số * trọng số
                                </th>
                            </tr>
                        </thead>

                        <tbody id="wbi-table-body">

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>

    </section>

    <!-- Include Chart.js -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <script>
        $(document).ready(function() {
    var currentPage = 1;
    var rowsPerPage = 1; // Số lượng hàng trên mỗi trang
    var pageNames = ["Vũng Tàu", "Bà Rịa", "Châu Đức", "Xuyên Mộc", "Long Điền", "Đất Đỏ", "Tân Thành", "Côn Đảo"]; // Tên các trang

    function renderTable(data, page, rowsPerPage) {
        var tableBody = $('#wbi-table-body');
        tableBody.empty(); // Clear existing data

        var start = (page - 1) * rowsPerPage;
        var end = start + rowsPerPage;
        var paginatedData = data.slice(start, end);

        paginatedData.forEach(function(district) {
            var indicatorsHtml = district.indicators.map(function(indicator) {
                return `<li class="mb-0 font-semibold leading-tight text-xs">${indicator.indicator}: <span style="float:inline-end">${indicator.value}</span></li>`;
            }).join('');
            var Weighted = district.indicators.map(function(indicator) {
                return `<li class="mb-0 font-semibold leading-tight text-xs">${indicator.indicator}:<span style="float:inline-end">${indicator.weightedValue}</span></li>`;
            }).join('');
            var row = `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${district.district}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${district.value}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><ul>${indicatorsHtml}</ul></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><ul>${Weighted}</ul></td>

            </tr>`;
            tableBody.append(row);
        });

        renderPagination(data.length, page, rowsPerPage);
    }

    function renderPagination(totalRows, currentPage, rowsPerPage) {
        var pagination = $('#pagination');
        pagination.empty(); // Clear existing pagination

        var totalPages = Math.ceil(totalRows / rowsPerPage);

        for (var i = 1; i <= totalPages; i++) {
            var pageName = pageNames[i - 1] || i; // Sử dụng tên trang từ mảng hoặc số trang nếu không có tên
            var pageButton = `<button class="px-4 py-2 mx-1 ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}" data-page="${i}">${pageName}</button>`;
            pagination.append(pageButton);
        }
    }

    $('#pagination').on('click', 'button', function() {
        currentPage = parseInt($(this).attr('data-page'));
        fetchData();
    });

    function fetchData() {
        $.ajax({
            url: '/api/wbi',
            method: 'GET',
            success: function(data) {
                renderTable(data, currentPage, rowsPerPage);
            },
            error: function(error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    fetchData(); // Initial data fetch
});


    </script>
@endsection
