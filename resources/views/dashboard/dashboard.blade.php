@extends("dashboard.layout")
@section("content")
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
                    <span class="text-2xl sm:text-3xl leading-none font-bold text-indigo-500">{{ $indicatorValue }}</span>
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
</section>

<!-- Include Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
    // Khởi tạo biểu đồ với dữ liệu mặc định
    const ctx = document.getElementById('usersChart').getContext('2d');
        const usersChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Người dùng mới trong tháng',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Gửi yêu cầu API để lấy dữ liệu từ route users.chart.data
        fetch('/api/users-chart-data')
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => item.month);
                const userData = data.map(item => item.count);

                // Cập nhật biểu đồ với dữ liệu mới
                usersChart.data.labels = labels;
                usersChart.data.datasets[0].data = userData;
                usersChart.update();
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
            function fetchAndRefreshBarChart() {
            // Fetch data for Bar Chart
            fetch('/api/topics-chart-data')
                .then(response => response.json())
                .then(data => {
                    const barLabels = data.map(item => item.topic_name);
                    const barData = data.map(item => item.news_count);

                    // Update Bar Chart
                    barChart.data.labels = barLabels;
                    barChart.data.datasets[0].data = barData;
                    barChart.update();
                })
                .catch(error => {
                    console.error('Error fetching bar chart data:', error);
                });
        }

        // Bar Chart
        const barCtx = document.getElementById('barChart').getContext('2d');
        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Bài viết',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Call function to fetch data and update Bar Chart
        fetchAndRefreshBarChart();
</script>
@endsection
