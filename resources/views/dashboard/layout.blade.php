<!doctype html>
<html x-data="{ darkMode: localStorage.getItem('dark') === 'true' }" x-init="$watch('darkMode', val => localStorage.setItem('dark', val))" x-bind:class="{ 'dark': darkMode }">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

    <script src="{{ asset('assets/js/font-awesome.js') }}" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <script src="{{ asset('assets/js/popper.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('assets/css/tailwind/tailwind.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/theme.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/loopple/loopple.css') }}">
</head>

<body>
    {{-- sidebar --}}
    @include('dashboard.sidebar')
    <div class="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200" id="panel">
        {{-- header --}}
        @include('dashboard.header')

        {{-- content --}}
        <x-alert />
        @yield('content')
    </div>
    <script src="{{ asset('assets/js/chartjs.min.js') }}"></script>
    <script src="{{ asset('assets/js/soft-ui-dashboard-tailwind.js') }}" async></script>
    <script>
        if(document.querySelector("#chart-bars")){
                  var ctx = document.getElementById("chart-bars").getContext("2d");
                  new Chart(ctx, {
                    type: "bar",
                    data: {
                      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                      datasets: [{
                        label: "Sales",
                        tension: 0.4,
                        borderWidth: 0,
                        borderRadius: 4,
                        borderSkipped: false,
                        backgroundColor: "#fff",
                        data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
                        maxBarThickness: 6
                      }, ],
                      },
                      options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          }
                        },
                        interaction: {
                          intersect: false,
                          mode: 'index',
                        },
                        scales: {
                          y: {
                            grid: {
                              drawBorder: false,
                              display: false,
                              drawOnChartArea: false,
                              drawTicks: false,
                            },
                            ticks: {
                              suggestedMin: 0,
                              suggestedMax: 500,
                              beginAtZero: true,
                              padding: 15,
                              font: {
                                size: 14,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                              },
                              color: "#fff"
                            },
                          },
                          x: {
                            grid: {
                              drawBorder: false,
                              display: false,
                              drawOnChartArea: false,
                              drawTicks: false
                            },
                            ticks: {
                              display: false
                            },
                          },
                        },
                      },
                    });

                  };

                  if(document.querySelector("#chart-line")){
                    var ctx2 = document.getElementById("chart-line").getContext("2d");

                    var gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);

                    gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
                    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
                    gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

                    var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);

                    gradientStroke2.addColorStop(1, 'rgba(20,23,39,0.2)');
                    gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
                    gradientStroke2.addColorStop(0, 'rgba(20,23,39,0)'); //purple colors

                    new Chart(ctx2, {
                      type: "line",
                      data: {
                        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: [{
                            label: "Mobile apps",
                            tension: 0.4,
                            borderWidth: 0,
                            pointRadius: 0,
                            borderColor: "#cb0c9f",
                            borderWidth: 3,
                            backgroundColor: gradientStroke1,
                            fill: true,
                            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                            maxBarThickness: 6

                          },
                          {
                            label: "Websites",
                            tension: 0.4,
                            borderWidth: 0,
                            pointRadius: 0,
                            borderColor: "#3A416F",
                            borderWidth: 3,
                            backgroundColor: gradientStroke2,
                            fill: true,
                            data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                            maxBarThickness: 6
                          },
                        ],
                      },
                      options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          }
                        },
                        interaction: {
                          intersect: false,
                          mode: 'index',
                        },
                        scales: {
                          y: {
                            grid: {
                              drawBorder: false,
                              display: true,
                              drawOnChartArea: true,
                              drawTicks: false,
                              borderDash: [5, 5]
                            },
                            ticks: {
                              display: true,
                              padding: 10,
                              color: '#b2b9bf',
                              font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                              },
                            }
                          },
                          x: {
                            grid: {
                              drawBorder: false,
                              display: false,
                              drawOnChartArea: false,
                              drawTicks: false,
                              borderDash: [5, 5]
                            },
                            ticks: {
                              display: true,
                              color: '#b2b9bf',
                              padding: 20,
                              font: {
                                size: 11,
                                family: "Open Sans",
                                style: 'normal',
                                lineHeight: 2
                              },
                            }
                          },
                        },
                      },
                    });
                  };
    </script>
    <script src="{{ asset('assets/js/loopple/loopple.js') }}"></script>
</body>

</html>
