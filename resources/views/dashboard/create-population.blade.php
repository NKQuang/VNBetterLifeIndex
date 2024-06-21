@extends("dashboard.layout")
@section("content")

<div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
    <div class="relative flex flex-col w-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
        <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl flex justify-between items-center">
            <h6 class="text-lg font-semibold text-white">Tạo mới thông tin dân số</h6>
        </div>
        <div class="flex-auto px-0 pt-0 pb-2">
            <div class="p-6">
                <form action="{{ route('populations.store') }}" method="POST">
                    @csrf
                    <div class="mb-4">
                        <label for="value" class="block text-sm font-medium text-gray-700">Số dân</label>
                        <input type="text" name="value" id="value" value="{{ old('value') }}" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-4">
                        <label for="district_id" class="block text-sm font-medium text-gray-700">Thuộc huyện</label>
                        <select name="district_id" id="district_id" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            @foreach($districts as $district)
                                <option value="{{ $district->id }}">{{ $district->full_name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="mt-4">
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Tạo mới</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection
