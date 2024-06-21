@extends('welcome')

@section('content')
<div class="container mx-auto my-4">
    <div class="flex justify-end mb-4">
        <select id="chartTypeSelector" class="p-2 border border-gray-300 rounded-md">
            <option value="bubble">Bubble</option>
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="radar">Radar</option>
            <option value="doughnut">Doughnut</option>
            <option value="polarArea">Polar Area</option>

        </select>
    </div>
    <div class="relative">
        <canvas id="chartCanvas" class="w-full h-96"></canvas>
    </div>
</div>
@endsection

@section('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    let chart;
    const ctx = document.getElementById('chartCanvas').getContext('2d');

    const chartData = {
        datasets: [{
            label: 'Quận/Huyện',
            data: [
                { x: 1, y: 8, r: 15, label: 'Thành phố Vũng tàu', info: 'GDP: $1.4T\nPopulation: 25M\nLife Expectancy: 82.9' },
                { x: 2, y: 6, r: 10, label: 'Brazil', info: 'GDP: $2.2T\nPopulation: 211M\nLife Expectancy: 75.7' },
                { x: 3, y: 7, r: 12, label: 'Canada', info: 'GDP: $1.8T\nPopulation: 37M\nLife Expectancy: 82.3' },
                { x: 4, y: 7, r: 12, label: 'Canada', info: 'GDP: $1.8T\nPopulation: 37M\nLife Expectancy: 82.3' },
                { x: 5, y: 7, r: 12, label: 'Canada', info: 'GDP: $1.8T\nPopulation: 37M\nLife Expectancy: 82.3' },
                { x: 6, y: 7, r: 12, label: 'Canada', info: 'GDP: $1.8T\nPopulation: 37M\nLife Expectancy: 82.3' },
                { x: 8, y: 7, r: 12, label: 'Canada', info: 'GDP: $1.8T\nPopulation: 37M\nLife Expectancy: 82.3' },
                { x: 9, y: 7, r: 12, label: 'Canada', info: 'GDP: $1.8T\nPopulation: 37M\nLife Expectancy: 82.3' },

                // Thêm các dữ liệu khác tương tự
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.2)',
            hoverBorderColor: 'rgba(255, 99, 132, 1)',
            hoverBorderWidth: 2
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.raw.label || '';
                        let info = context.raw.info || '';
                        return label + ': (' + context.raw.x + ', ' + context.raw.y + ')\n' + info;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 0,
                max: 10
            },
            y: {
                min: 0,
                max: 10
            }
        },
        onHover: function(event, elements) {
            if (elements.length) {
                event.native.target.style.cursor = 'pointer';
            } else {
                event.native.target.style.cursor = 'default';
            }
        },
        hover: {
            mode: 'nearest',
            intersect: true
        }
    };

    function createChart(type) {
        if (chart) {
            chart.destroy();
        }
        chart = new Chart(ctx, {
            type: type,
            data: chartData,
            options: chartOptions
        });
    }

    document.getElementById('chartTypeSelector').addEventListener('change', function() {
        createChart(this.value);
    });

    // Initialize the chart with the default type
    createChart('bubble');
</script>
@endsection
