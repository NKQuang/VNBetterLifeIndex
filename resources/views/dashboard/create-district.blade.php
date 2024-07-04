@extends("dashboard.layout")
@section("content")
<div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto bg-white p-6 mt-10 rounded shadow">
        <h1 class="text-2xl font-bold mb-6">{{ $title }}</h1>

        @if(session('success'))
            <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                <p>{{ session('success') }}</p>
            </div>
        @endif

        <form action="{{ route('districts.store') }}" method="POST">
            @csrf
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Tên</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Tên quận/huyện">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="full_name">Tên đầy đủ</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="full_name" name="full_name" type="text" placeholder="Tên đầy đủ">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="full_name_en">Tên đầy đủ (English)</label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="full_name_en" name="full_name_en" type="text" placeholder="Tên đầy đủ (English)">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="content">Nội dung</label>
                <textarea rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="content" name="content" placeholder="Nội dung"></textarea>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="regions_code">Mã vùng (<span class="text-xs ">Hiện tại mặc định duy nhất tỉnh Bà rịa - Vũng tàu</span>)</label>
                <input value="77" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="regions_code" name="regions_code" type="text" placeholder="Mã vùng" readonly>
            </div>
            <div class="flex items-center justify-between">
                <button class="px-4 py-2 bg-gray-300 text-blue-500 rounded hover:bg-gray-400 mr-2" type="submit">
                    Thêm mới
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
