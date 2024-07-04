@extends('dashboard.layout')
@section('content')
    <div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
        <div
            class="relative flex flex-col w-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
            <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl flex justify-between items-center">
                <h6 class="text-lg font-semibold text-white">Chỉnh sửa chỉ số</h6>
            </div>
            <div class="flex-auto px-0 pt-0 pb-2">
                <div class="p-6 bg-white rounded-t-2xl">
                    <form action="{{ route('indicators.value.store') }}" method="POST"
                        class="flex flex-col space-y-4">
                        @csrf
                        <div class="flex flex-col mb-3">
                            <label for="district_id" class="text-sm font-medium text-gray-700">Quận/Huyện:</label>
                            <select name="district_id" id="district_id"
                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" required>
                                @foreach($districts as $district)
                                    <option value="{{ $district->id }}">
                                        {{ $district->full_name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="flex flex-col mb-3">
                            <label for="indicator_id" class="text-sm font-medium text-gray-700">Loại chỉ số:</label>
                            <select name="indicator_id" id="indicator_id"
                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" required>
                                @foreach($indicators as $indicator)
                                    <option value="{{ $indicator->id }}">
                                        {{ $indicator->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="flex flex-col">
                            <label for="value" class="text-sm font-medium text-gray-700">Giá trị mặc định:</label>
                            <input type="number" name="value" id="value"
                                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" step="0.00000000000000001" min="0"
                                max="10" required>
                        </div>
                        <div class="flex items-end justify-between">
                            <button type="submit"
                                class=" text-blue-500 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                                Tạo mới
                            </button>
                            <a href="{{ route('dashboard.indicator-value-admin') }}"
                                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                                Hủy bỏ
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    {{-- <div class="container">
        <h1>{{ $title }}</h1>
        <form action="{{ route('indicators.value.store') }}" method="POST">
            @csrf

            <div class="flex flex-col mb-3">
                <label for="district_id" class="text-sm font-medium text-gray-700">Quận:</label>
                <select name="district_id" id="district_id"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" required>
                    @foreach($districts as $district)
                        <option value="{{ $district->id }}" {{ old('district_id') == $district->id ? 'selected' : '' }}>
                            {{ $district->full_name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="flex flex-col mb-3">
                <label for="indicator_id" class="text-sm font-medium text-gray-700">Chỉ số:</label>
                <select name="indicator_id" id="indicator_id"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" required>
                    @foreach($indicators as $indicator)
                        <option value="{{ $indicator->id }}" {{ old('indicator_id') == $indicator->id ? 'selected' : '' }}>
                            {{ $indicator->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="flex flex-col mb-3">
                <label for="value" class="text-sm font-medium text-gray-700">Giá trị:</label>
                <input type="text" name="value" id="value"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    value="{{ old('value') }}" required>
            </div>

            <button type="submit" class="btn btn-primary">Tạo mới</button>
        </form>
    </div> --}}
@endsection
