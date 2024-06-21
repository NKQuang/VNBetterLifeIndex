@php
$currentUrl = request()->url();
@endphp
<aside class="max-w-62.5 ease-nav-brand z-990 absolute inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-lg transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent text-slate-500" id="sidenav-main" data-sidebar="true" data-sidebar-value="null">
    <div class="h-19.5">
        <i class="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden" sidenav-close="" aria-hidden="true"></i>
        <a class="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700" href="#">
            <img src="{{ asset('img/logo.jpg') }}" class="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo">

            <span class="ml-1 font-semibold transition-all duration-200 ease-nav-brand">VN Better Life</span>
        </a>
    </div>
    <hr class="h-px mt-0 bg-transparent bg-gradient-horizontal-dark">
    <div class="items-center block w-auto max-h-screen overflow-auto grow basis-full">
        <ul class="flex flex-col pl-0 mb-0">
            <li class="mt-0.5 w-full">
                <a class="{{ strpos($currentUrl, '/dashboard') !== false ? 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors' : 'py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors ' }}" href="/dashboard">
                    <div class="{{ strpos($currentUrl, '/dashboard') !== false ?  'bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5':'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}}">
                        <i class="fa-solid fa-house-user"></i>
                    </div>
                    <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Dashboard</span>
                </a>
            </li>
            <li class="mt-0.5 w-full">
                <a class="{{ strpos($currentUrl, '/users') !== false ? 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors' : 'py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors ' }}" href='/users'>
                    <div  class="{{ strpos($currentUrl, '/users') !== false ?  'bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5':'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}}">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Quản lý người dùng</span>
                </a>
            </li>
            {{-- <li class="mt-0.5 w-full">
                <a class="{{ strpos($currentUrl, '/rating') !== false ? 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors' : 'py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors ' }}" href="/rating">
                    <div class="{{ strpos($currentUrl, '/rating') !== false ?  'bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5':'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}}">
                        <i class="fa-solid fa-house-user"></i>
                    </div>
                    <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Quản lý đánh giá</span>
                </a>
            </li> --}}
            <li class="mt-0.5 w-full">
                <a class="{{ strpos($currentUrl, '/districts') !== false ? 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors' : 'py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors ' }}" href="/districts">
                    <div class="{{ strpos($currentUrl, '/districts') !== false ?  'bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5':'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}}">
                        <i class="fa-solid fa-house-user"></i>
                    </div>
                    <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Quản lý Quận/Huyện</span>
                </a>
            </li>
            <li class="mt-0.5 w-full">
                <a class="{{ strpos($currentUrl, '/indicators') !== false ? 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors' : 'py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors ' }}" href="/indicators">
                    <div class="{{ strpos($currentUrl, '/indicators') !== false ?  'bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5':'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}}">
                        <i class="fa-solid fa-chart-bar"></i>
                    </div>
                    <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Quản lý Chỉ số</span>
                </a>
            </li>
            <li class="mt-0.5 w-full">
                <a class="{{ strpos($currentUrl, '/indicator-values') !== false ? 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors' : 'py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors ' }}" href="/indicator-values">
                    <div class="{{ strpos($currentUrl, '/indicator-values') !== false ?  'bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5':'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}}">
                        <i class="fa-solid fa-chart-line"></i>
                    </div>
                    <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Quản lý Giá trị chỉ số</span>
                </a>
            </li>
            <li class="mt-0.5 w-full">
                <a class="{{ strpos($currentUrl, '/populations') !== false ? 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors' : 'py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors ' }}" href="/populations">
                    <div class="{{ strpos($currentUrl, '/populations') !== false ?  'bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5':'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}}">
                        <i class="fa-solid fa-users"></i>
                    </div>
                    <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Quản lý Dân số</span>
                </a>
            </li>
            {{-- <li class="mt-0.5 w-full">
                <a class="{{ strpos($currentUrl, '/regions') !== false ? 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors' : 'py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors ' }}" href="/regions">
                    <div class="{{ strpos($currentUrl, '/regions') !== false ?  'bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5':'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}}">
                        <i class="fa-solid fa-map-marked-alt"></i>
                    </div>
                    <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Quản lý Khu vực</span>
                </a>
            </li> --}}
            <li class="mt-0.5 w-full">
                <a class="{{ strpos($currentUrl, '/weights') !== false ? 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors' : 'py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors ' }}" href="/weights">
                    <div class="{{ strpos($currentUrl, '/weights') !== false ?  'bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5':'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}}">
                        <i class="fa-solid fa-weight-hanging"></i>
                    </div>
                    <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Quản lý Trọng số</span>
                </a>
            </li>
            <li class="mt-0.5 w-full">
                <a class="{{ strpos($currentUrl, '/questions') !== false ? 'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors' : 'py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors ' }}" href="/questions">
                    <div class="{{ strpos($currentUrl, '/questions') !== false ?  'bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5':'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'}}">
                        <i class="fa-solid fa-question"></i>
                    </div>
                    <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Quản lý Câu hỏi</span>
                </a>
            </li>
        </ul>
    </div>
</aside>
