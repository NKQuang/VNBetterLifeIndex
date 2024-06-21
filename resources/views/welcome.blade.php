<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="{{ asset('assets/css/tailwind/tailwind.min.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/css/theme.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/css/loopple/loopple.css') }}">
        <script src="{{ asset('assets/js/chartjs.min.js') }}"></script>
        <script src="{{ asset('assets/js/font-awesome.js') }}"></script>
        <script src="{{ asset('assets/js/popper.min.js') }}"></script>
        <script src="{{ asset('assets/js/chartjs.min.js') }}"></script>

        <!-- Scripts -->
        @vite(['resources/css/app.css'])

        <!-- Styles -->
        @livewireStyles
    </head>
    <body class="font-sans antialiased">
        <x-banner />
        @vite('resources/js/app.jsx')
        <div class="min-h-screen bg-gray-100">
            @livewire('navigation-menu-user')

            <!-- Page Heading -->
            @if (isset($header))
                <header class="bg-white shadow">
                    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {{ $header }}
                    </div>
                </header>
            @endif
            <main class="w-full bg-white pt-20">
                @yield('content')
            </main>
        </div>

        @stack('modals')

        @yield('scripts')

    </body>
</html>
